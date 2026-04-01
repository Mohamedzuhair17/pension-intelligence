/**
 * ============================================================================
 * PENSION PAL: ADVANCED RAG ARCHITECTURE (v2.0.0)
 * ============================================================================
 * An enterprise-grade implementation for India's National Pension System (NPS).
 * * FEATURES:
 * - Semantic Text Chunking with Overlap
 * - Local Vector Cache (Filesystem Persistence)
 * - Exponential Backoff & Retry Logic
 * - Hybrid Retrieval Scoring (Semantic + BM25-ish + Topic)
 * - Multi-language Intent Classification
 * - Robust Error Handling & API Safety
 * ============================================================================
 */

import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { URL } from "node:url";
import { EventEmitter } from "node:events";
import { knowledgeBase } from "./knowledge-base.mjs";
import { buildContext } from "./services/rag-service.mjs";

/**
 * ----------------------------------------------------------------------------
 * 1. CONFIGURATION & CONSTANTS
 * ----------------------------------------------------------------------------
 */
const CONFIG = {
  HOST: process.env.API_HOST || "127.0.0.1",
  PORT: Number(process.env.API_PORT || 8787),
  NVIDIA: {
    EMBED_KEY: process.env.NVIDIA_EMBED_API_KEY,
    CHAT_KEY: process.env.NVIDIA_CHAT_API_KEY,
    BASE_URL: "https://integrate.api.nvidia.com/v1",
    EMBED_MODEL: process.env.NVIDIA_EMBED_MODEL || "baai/bge-m3",
    CHAT_MODEL: process.env.NVIDIA_CHAT_MODEL || "meta/llama-3.2-3b-instruct",
  },
  RAG: {
    CHUNK_SIZE: 400,
    CHUNK_OVERLAP: 80,
    TOP_K: 5,
    SCORE_THRESHOLD: 0.30,
    CACHE_PATH: "./.vector_cache.json",
    ENABLE_VERIFICATION: true,
    ENABLE_CALCULATION: true
  },
  LIMITS: {
    MAX_QUERY_LEN: 400,
    REQUEST_TIMEOUT: 15000,
    MAX_RETRIES: 3
  }
};

/**
 * ----------------------------------------------------------------------------
 * 2. CORE UTILITIES & LOGGING
 * ----------------------------------------------------------------------------
 */
class Logger {
  static info(msg) { console.log(`[INFO] [${new Date().toISOString()}] ${msg}`); }
  static warn(msg) { console.warn(`[WARN] [${new Date().toISOString()}] ${msg}`); }
  static error(msg, err) { console.error(`[ERR] [${new Date().toISOString()}] ${msg}`, err); }
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * ----------------------------------------------------------------------------
 * 3. RESILIENCE: API CLIENT WITH RETRY
 * ----------------------------------------------------------------------------
 */
async function robustFetch(url, options, attempt = 1) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CONFIG.LIMITS.REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });

    if (response.status === 429) { // Rate limited
      if (attempt <= CONFIG.LIMITS.MAX_RETRIES) {
        const backoff = attempt * 2000;
        Logger.warn(`Rate limited. Retrying in ${backoff}ms...`);
        await sleep(backoff);
        return robustFetch(url, options, attempt + 1);
      }
    }

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`HTTP_${response.status}: ${errorBody}`);
    }

    return await response.json();
  } catch (err) {
    if (err.name === 'AbortError') throw new Error("Request timed out");
    if (attempt <= CONFIG.LIMITS.MAX_RETRIES) {
      Logger.warn(`Fetch error: ${err.message}. Retrying...`);
      return robustFetch(url, options, attempt + 1);
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * ----------------------------------------------------------------------------
 * 4. SEMANTIC CHUNKING ENGINE
 * ----------------------------------------------------------------------------
 */
class ChunkingEngine {
  /**
   * Splits text into overlapping semantic windows.
   * This ensures that entities split across boundaries are still retrievable.
   */
  static splitText(text, size = CONFIG.RAG.CHUNK_SIZE, overlap = CONFIG.RAG.CHUNK_OVERLAP) {
    if (!text) return [];
    const chunks = [];
    let start = 0;

    while (start < text.length) {
      let end = start + size;
      
      // Try to find a logical breaking point (sentence or paragraph)
      if (end < text.length) {
        const lastPeriod = text.lastIndexOf('.', end);
        const lastNewline = text.lastIndexOf('\n', end);
        const breakPoint = Math.max(lastPeriod, lastNewline);
        
        if (breakPoint > start + (size * 0.5)) {
          end = breakPoint + 1;
        }
      }

      chunks.push(text.substring(start, end).trim());
      start = end - overlap;
      if (start < 0) start = 0;
      if (end >= text.length) break;
    }
    return chunks;
  }

  static processKB(kb) {
    const processed = [];
    for (const item of kb) {
      const textChunks = this.splitText(item.text);
      textChunks.forEach((chunkText, idx) => {
        processed.push({
          ...item,
          id: `${item.id}_ch${idx}`,
          text: chunkText,
          isHindi: false
        });
      });

      if (item.textHindi) {
        const hindiChunks = this.splitText(item.textHindi);
        hindiChunks.forEach((chunkText, idx) => {
          processed.push({
            ...item,
            id: `${item.id}_hi_ch${idx}`,
            text: chunkText,
            isHindi: true
          });
        });
      }
    }
    return processed;
  }
}

/**
 * ----------------------------------------------------------------------------
 * 5. VECTOR STORAGE & CACHING
 * ----------------------------------------------------------------------------
 */
class VectorStore {
  constructor() {
    this.chunks = [];
    this.isReady = false;
  }

  async initialize() {
    Logger.info("Initializing Vector Store...");
    
    // 1. Try to load from local cache file
    try {
      const cacheData = await fs.readFile(CONFIG.RAG.CACHE_PATH, 'utf-8');
      this.chunks = JSON.parse(cacheData);
      this.isReady = true;
      Logger.info(`Loaded ${this.chunks.length} chunks from cache.`);
      return;
    } catch (e) {
      Logger.warn("No vector cache found. Building from scratch...");
    }

    // 2. Build if cache fails
    const rawChunks = ChunkingEngine.processKB(knowledgeBase);
    
    if (!CONFIG.NVIDIA.EMBED_KEY) {
      Logger.warn("EMBED_API_KEY missing. Running in Keyword-Only mode.");
      this.chunks = rawChunks;
      return;
    }

    // 3. Generate Embeddings with Batching
    const enriched = [];
    const batchSize = 10;
    
    for (let i = 0; i < rawChunks.length; i += batchSize) {
      const batch = rawChunks.slice(i, i + batchSize);
      Logger.info(`Embedding batch ${Math.floor(i/batchSize) + 1}...`);
      
      const promises = batch.map(async (c) => {
        try {
          const vector = await this.createEmbedding(c.text, "passage");
          return { ...c, embedding: vector };
        } catch (err) {
          Logger.error(`Failed embedding for chunk ${c.id}`, err);
          return c;
        }
      });

      const results = await Promise.all(promises);
      enriched.push(...results);
    }

    this.chunks = enriched;
    this.isReady = true;

    // 4. Persist to cache
    try {
      await fs.writeFile(CONFIG.RAG.CACHE_PATH, JSON.stringify(this.chunks));
      Logger.info("Vector cache saved to disk.");
    } catch (e) {
      Logger.error("Failed to save cache", e);
    }
  }

  async createEmbedding(input, type = "query") {
    const payload = await robustFetch(`${CONFIG.NVIDIA.BASE_URL}/embeddings`, {
      method: "POST",
      headers: { 
        "Authorization": `Bearer ${CONFIG.NVIDIA.EMBED_KEY}`,
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        model: CONFIG.NVIDIA.EMBED_MODEL,
        input: input.substring(0, 2000), // Safety truncation
        input_type: type,
        encoding_format: "float"
      })
    });
    return payload.data?.[0]?.embedding;
  }

  cosineSimilarity(vecA, vecB) {
    if (!vecA || !vecB) return 0;
    let dot = 0, normA = 0, normB = 0;
    for (let i = 0; i < vecA.length; i++) {
      dot += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  /**
   * HYBRID SEARCH ALGORITHM
   * Combines Semantic Similarity + Keyword Overlap + Topic Relevance
   */
  async search(query, limit = CONFIG.RAG.TOP_K) {
    const normalizedQuery = query.toLowerCase();
    let queryVector = null;

    if (this.isReady && CONFIG.NVIDIA.EMBED_KEY) {
      try {
        queryVector = await this.createEmbedding(query, "query");
      } catch (e) {
        Logger.warn("Query embedding failed, falling back to keywords.");
      }
    }

    const queryWords = normalizedQuery.split(/\W+/).filter(w => w.length > 2);

    const scored = this.chunks.map(chunk => {
      let semanticScore = 0;
      if (queryVector && chunk.embedding) {
        semanticScore = this.cosineSimilarity(queryVector, chunk.embedding);
      }

      // Keyword Boosting (BM25 Lite)
      const matches = queryWords.filter(word => 
        chunk.text.toLowerCase().includes(word) || 
        chunk.keywords?.some(k => k.toLowerCase().includes(word))
      ).length;
      const keywordScore = matches / Math.max(queryWords.length, 1);

      // Topic Match Boost
      const topicBoost = normalizedQuery.includes(chunk.topic?.toLowerCase()) ? 0.2 : 0;

      // Weighted Fusion
      const finalScore = queryVector 
        ? (semanticScore * 0.6) + (keywordScore * 0.3) + topicBoost
        : (keywordScore * 0.8) + topicBoost;

      return { ...chunk, score: finalScore };
    });

    return scored
      .filter(c => c.score > CONFIG.RAG.SCORE_THRESHOLD)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }
}

/**
 * ----------------------------------------------------------------------------
 * 6. LINGUISTICS & CLASSIFICATION
 * ----------------------------------------------------------------------------
 */
class IntentAnalyzer {
  static getLanguage(text) {
    // Unicode range for Devanagari (Hindi)
    if (/[\u0900-\u097F]/.test(text)) return "hi";
    
    const hinglishTerms = ["kya", "hai", "kaise", "kab", "pensioner", "milta", "batao"];
    const tokens = text.toLowerCase().split(/\s+/);
    if (tokens.some(t => hinglishTerms.includes(t))) return "hi";
    
    return "en";
  }

  static classify(text) {
    const clean = text.toLowerCase().trim();
    
    // 1. Greeting Detection
    const greetings = ["hi", "hello", "hey", "namaste", "good morning", "salam", "vanakkam"];
    if (greetings.some(g => clean.startsWith(g) && clean.length < 15)) return "GREETING";

    // 2. Gibberish / Too Short
    if (clean.length < 3) return "GIBBERISH";

    // 3. Pension Specificity
    const pensionTerms = ["nps", "pension", "pran", "annuity", "retirement", "80ccd", "tier", "exit", "claim"];
    if (pensionTerms.some(t => clean.includes(t))) return "PENSION_QUERY";

    return "GENERAL_QUERY";
  }
}

/**
 * ----------------------------------------------------------------------------
 * 7. RESPONSE GENERATION PIPELINE
 * ----------------------------------------------------------------------------
 */
class ResponseEngine {
  constructor(vectorStore) {
    this.vectorStore = vectorStore;
  }

  async handle(userQuery, options = {}) {
    const lang = options.lang || IntentAnalyzer.getLanguage(userQuery);
    const intent = IntentAnalyzer.classify(userQuery);
    const userProfile = options.userProfile;
    const financialSnapshot = options.financialSnapshot;

    Logger.info(`Processing Query: "${userQuery.substring(0, 50)}..." [Intent: ${intent}, Lang: ${lang}]`);

    switch (intent) {
      case "GREETING":
        return this.greet(lang, userProfile);
      case "GIBBERISH":
        return { answer: "Please provide a valid question regarding NPS or pensions.", confidence: "Medium" };
      case "PENSION_QUERY":
        return this.executeRAG(userQuery, lang, userProfile, financialSnapshot);
      default:
        return this.generalChat(userQuery, lang, userProfile, financialSnapshot);
    }
  }

  greet(lang, userProfile) {
    const first = userProfile?.fullName ? String(userProfile.fullName).split(/\s+/)[0] : "";
    if (lang === "hi") {
      return {
        answer: first
          ? `Namaste ${first}! Main Pension Pal hoon. Main NPS, tax benefits aur retirement planning mein apki madad kar sakta hoon.`
          : "Namaste! Main Pension Pal hoon. Main NPS, tax benefits aur retirement planning mein apki madad kar sakta hoon.",
        confidence: "High",
      };
    }
    return {
      answer: first
        ? `Hello ${first}! I'm Pension Pal. I can help you with NPS rules, tax benefits, and withdrawal processes.`
        : "Hello! I'm Pension Pal. I can help you with NPS rules, tax benefits, and withdrawal processes.",
      confidence: "High",
    };
  }

  async generalChat(query, lang, userProfile, financialSnapshot) {
    if (!CONFIG.NVIDIA.CHAT_KEY) {
      return { answer: "I'm specialized in NPS. For general queries, please enable my chat module.", confidence: "Low" };
    }

    const combined = buildContext(
      userProfile,
      financialSnapshot,
      "(General query — no NPS knowledge base block.)",
      query
    );
    const system =
      lang === "hi"
        ? "Aap Pension Pal hain. User ke profile ke saath chhota, saaf Hindi/Urdu jawab dein jahan upyukt ho."
        : "You are Pension Pal. Give a concise answer; tie in the user's profile numbers when relevant.";

    try {
      const res = await this.callLLM(combined, system);
      return { answer: res, confidence: "Medium", intent: "GENERAL" };
    } catch (e) {
      return { answer: "I'm having trouble processing that general query right now.", confidence: "Low" };
    }
  }

  async executeRAG(query, lang, userProfile, financialSnapshot) {
    // 1. Retrieval
    const hits = await this.vectorStore.search(query);
    
    if (hits.length === 0) {
      return {
        answer: lang === "hi" 
          ? "Maaf kijiye, mujhe NPS knowledge base mein iska vishwasniya uttar nahi mila." 
          : "I couldn't find specific information in the NPS knowledge base. Please check npscra.nsdl.co.in.",
        confidence: "Low",
        sources: []
      };
    }

    // 2. Context Construction
    const contextText = hits
      .map((h, i) => `[Doc ${i+1}]: ${h.text}`)
      .join("\n\n");

    const sources = [...new Set(hits.map(h => h.source))].map(s => ({ name: s }));

    // 3. LLM Augmentation — knowledge base + user profile (RAGService.buildContext)
    if (CONFIG.NVIDIA.CHAT_KEY) {
      const isNumericQuery = /\d+|rupee|amount|corpus|pension|salary|contribution|tax|return|percentage/i.test(query);

      const advisorBody = buildContext(userProfile, financialSnapshot, contextText, query);

      const systemPrompt = `You are Pension Pal, an NPS advisor for India. The user message contains KNOWLEDGE BASE, USER PROFILE, and USER QUESTION.
Rules:
- Use KNOWLEDGE BASE for regulatory / factual NPS information.
- Use USER PROFILE and FINANCIAL SNAPSHOT numbers for personalized calculations and examples.
- Give a clear answer (2–6 sentences unless more detail is needed).
- Do NOT include meta-text like "Note:", "To verify:", or "The knowledge base shows...".
- If a fact is not in the knowledge base, say so for that fact only; still personalize using profile numbers where relevant.
${isNumericQuery ? "- For calculations, show clear steps using the user's numbers when applicable." : ""}
Language: ${lang === "hi" ? "Hindi" : "English"}`;

      try {
        let answer = await this.callLLM(advisorBody, systemPrompt);
        
        // Clean up any remaining meta-text that LLM might add
        answer = answer
          .replace(/^(ANSWER|Note|Based on|To verify|Original context).*?:\s*/gi, "")
          .replace(/\n\n/g, "\n")  // Remove extra spacing
          .trim();
        
        // VERIFICATION STEP: Check if answer is supported by context
        if (CONFIG.RAG.ENABLE_VERIFICATION && !answer.includes("not") && !answer.includes("available")) {
          const verificationPrompt = `Check if this answer is supported by the provided context. If any part is unsupported, correct it using ONLY the context.

Answer: ${answer}

Context: ${contextText}

If you corrected anything, start with [CORRECTED]. Otherwise just respond with the answer as-is.`;
          
          const verification = await this.callLLM(verificationPrompt, "You are a fact-checker. Verify answers against context. If unsupported, correct silently using ONLY the context.");
          
          if (verification.includes("[CORRECTED]")) {
            answer = verification.replace("[CORRECTED]", "").trim();
            Logger.info("Answer corrected during verification");
          }
        }
        
        return {
          answer,
          confidence: hits[0].score > 0.7 ? "High" : hits[0].score > 0.5 ? "Medium" : "Low",
          sources,
          intent: "RAG_PENSION",
          retrievalScore: hits[0].score
        };
      } catch (e) {
        Logger.error("RAG LLM Error", e);
      }
    }

    // 4. Deterministic Fallback (if LLM fails or is disabled)
    return {
      answer: hits[0].text,
      confidence: "Medium (Raw Retrieval)",
      sources
    };
  }

  async callLLM(userMessage, systemMessage = "You are a helpful assistant.") {
    const payload = await robustFetch(`${CONFIG.NVIDIA.BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CONFIG.NVIDIA.CHAT_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: CONFIG.NVIDIA.CHAT_MODEL,
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: userMessage }
        ],
        temperature: 0.1,
        max_tokens: 800
      })
    });

    return payload.choices?.[0]?.message?.content?.trim() || "No response generated.";
  }
}

/**
 * ----------------------------------------------------------------------------
 * 8. HTTP SERVER & ROUTING
 * ----------------------------------------------------------------------------
 */
const vStore = new VectorStore();
const rEngine = new ResponseEngine(vStore);

const server = http.createServer(async (req, res) => {
  // Global CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json"
  };

  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    return res.end();
  }

  const url = new URL(req.url || "/", `http://${req.headers.host}`);

  // Health Check
  if (url.pathname === "/api/health") {
    res.writeHead(200, headers);
    return res.end(JSON.stringify({ 
      status: "online", 
      indexed_chunks: vStore.chunks.length,
      embeddings_active: vStore.isReady
    }));
  }

  // Chat Endpoint
  if (req.method === "POST" && url.pathname === "/api/chat") {
    try {
      let body = "";
      for await (const chunk of req) body += chunk;
      
      const parsed = JSON.parse(body || "{}");
      const message = String(parsed.message || "").trim();

      if (!message) {
        res.writeHead(400, headers);
        return res.end(JSON.stringify({ error: "Message is empty" }));
      }

      const result = await rEngine.handle(message, {
        lang: parsed.language,
        userProfile: parsed.userProfile ?? null,
        financialSnapshot: parsed.financialSnapshot ?? null,
      });
      
      res.writeHead(200, headers);
      res.end(JSON.stringify(result));

    } catch (err) {
      Logger.error("Request Error", err);
      res.writeHead(500, headers);
      res.end(JSON.stringify({ error: "Internal Server Error", message: err.message }));
    }
    return;
  }

  // Not Found
  res.writeHead(404, headers);
  res.end(JSON.stringify({ error: "Endpoint not found" }));
});

/**
 * ----------------------------------------------------------------------------
 * 9. APPLICATION BOOTSTRAP
 * ----------------------------------------------------------------------------
 */
(async () => {
  try {
    Logger.info("--- Starting Pension Pal Backend v2.0 ---");
    
    // Validate Environment
    if (!CONFIG.NVIDIA.EMBED_KEY) Logger.warn("NVIDIA_EMBED_API_KEY is not set.");
    if (!CONFIG.NVIDIA.CHAT_KEY) Logger.warn("NVIDIA_CHAT_API_KEY is not set.");

    // Load Knowledge Base
    await vStore.initialize();

    // Start Server
    server.listen(CONFIG.PORT, CONFIG.HOST, () => {
      Logger.info(`Server listening on http://${CONFIG.HOST}:${CONFIG.PORT}`);
    });

  } catch (criticalErr) {
    Logger.error("CRITICAL BOOT ERROR", criticalErr);
    process.exit(1);
  }
})();

/**
 * ----------------------------------------------------------------------------
 * 10. GRACEFUL SHUTDOWN
 * ----------------------------------------------------------------------------
 */
process.on('SIGINT', () => {
  Logger.info("Shutting down gracefully...");
  server.close(() => {
    Logger.info("Server closed.");
    process.exit(0);
  });
});
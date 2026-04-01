import { useState, useRef, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import {
  Send, Mic, Plus, Search, MessageSquare, Copy, ThumbsUp,
  ThumbsDown, Clock, Bot, User, ChevronRight, Sparkles, Command
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/useAppStore';
import { t } from '@/i18n/translations';
import { computeFinancialForUser } from '@/lib/insightEngine';
import type { Message, User, FinancialSimulationResult } from '@/types';

const suggestedQuestions = [
  'What are the tax benefits of NPS?',
  'How can I withdraw from Tier I?',
  'What documents are needed to open an NPS account?',
  'Can you explain NPS eligibility in Hindi?',
];

const fallbackErrorMessage =
  "I couldn't reach the pension assistant service right now. Please start the local API server and check your NVIDIA API key.";

type ChatApiResponse = {
  answer: string;
  confidence?: 'High' | 'Medium' | 'Low';
  sources?: Array<{ name: string; url: string }>;
  intent?: string;
  calculatorUrl?: string;
  error?: string;
};

function buildChatPayload(
  message: string,
  language: string,
  user: User | null,
  financial: FinancialSimulationResult | null
) {
  return {
    message,
    language,
    userProfile: user
      ? {
          fullName: user.fullName,
          age: user.npsData?.age,
          retirementAge: user.targetRetirementAge ?? user.npsData?.retirementAge,
          annualIncome: user.annualIncome,
          currentCorpus: user.npsData?.totalCorpus,
          monthlyContribution: user.monthlyNpsContribution,
          contributionIncreaseRate: user.annualContributionIncrease,
          annualContributionIncrease: user.annualContributionIncrease,
          expectedReturnRate: user.expectedReturnRate,
          incomeGrowthRate: user.incomeGrowthRate,
          riskProfile: user.riskProfile,
          npsTier: user.npsTierPreference ?? user.tier,
          fundManager: user.fundManagerPreference ?? user.npsData?.fundManager,
          pran: user.pran,
        }
      : null,
    financialSnapshot: financial
      ? {
          projectedCorpus: financial.projectedCorpus,
          monthlyPension: financial.monthlyPension,
          totalContributions: financial.totalContributions,
          totalReturns: financial.totalReturns,
          investmentReturns: financial.totalReturns,
          lumpSum: financial.lumpSumWithdrawal,
          lumpSumWithdrawal: financial.lumpSumWithdrawal,
          annuity: financial.annuityAmount,
          annuityAmount: financial.annuityAmount,
        }
      : null,
  };
}

export default function AssistantPage() {
  const { conversations, currentConversation, addMessage, clearConversation, language, user } = useAppStore();
  const financial = useMemo(() => computeFinancialForUser(user), [user]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  const [errorText, setErrorText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [currentConversation, isTyping]);

  useEffect(() => {
    const topic = searchParams.get('topic');
    const prompt = searchParams.get('prompt');
    if (!topic && !prompt) return;
    const line = prompt || (topic ? `Tell me more about: ${decodeURIComponent(topic)}` : '');
    if (line) setInput(line);
    setSearchParams({}, { replace: true });
  }, [searchParams, setSearchParams]);

  const sendPresetPrompt = async (prompt: string) => {
    if (isTyping) return;
    setInput(prompt);
    await new Promise((resolve) => window.requestAnimationFrame(resolve));
    const current = inputRef.current;
    if (current) {
      current.value = prompt;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const messageToSend = input.trim();
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    addMessage(userMsg);
    setInput('');
    setErrorText('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buildChatPayload(messageToSend, language, user, financial)),
      });

      const payload = (await response.json()) as ChatApiResponse;
      if (!response.ok) {
        throw new Error(payload.error || 'Assistant request failed.');
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: payload.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: payload.confidence || 'Medium',
        sources: payload.sources || [],
        calculatorUrl: payload.calculatorUrl,
      };
      addMessage(botMsg);
    } catch (error) {
      const details = error instanceof Error ? error.message : fallbackErrorMessage;
      setErrorText(details);

      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallbackErrorMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: 'Low',
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  return (
    <div className="flex h-[calc(100vh-7rem)] gap-4 max-w-7xl">
      {/* Left Panel — Chat History */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="rounded-2xl overflow-hidden shrink-0 hidden lg:flex flex-col"
            style={{
              background: 'var(--bg-base)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="p-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <button
                onClick={() => { clearConversation(); setErrorText(''); }}
                className="w-full btn-gradient-purple py-2.5 text-sm flex items-center justify-center gap-2 rounded-xl"
              >
                <Plus className="w-4 h-4" /> {t('newChat', language)}
              </button>
            </div>
            <div className="p-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  placeholder={t('searchChats', language)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-pp-purple/30"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-1">
              {conversations.map((conv) => (
                <button key={conv.id}
                  className="w-full text-left p-3 rounded-xl transition-all duration-150 group relative"
                  style={{ }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(124,58,237,0.06)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                    <span className="text-sm font-medium text-[var(--text-primary)] truncate">{conv.title}</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 truncate pl-6">{conv.lastMessage}</p>
                  <span className="text-[10px] text-[var(--text-muted)] pl-6">{conv.timestamp}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col rounded-2xl overflow-hidden"
        style={{ background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Chat header */}
        <div className="p-4 flex items-center justify-between"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="lg:hidden p-1.5 rounded-lg text-[var(--text-muted)]"
              style={{ }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center"
              style={{ boxShadow: '0 0 20px rgba(124,58,237,0.3)' }}
            >
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-sm text-[var(--text-primary)]">{t('npsAIAssistant', language)}</h3>
              <span className="text-[11px] flex items-center gap-1" style={{ color: '#10B981' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse-soft" style={{ background: '#10B981' }} /> {t('online', language)}
              </span>
            </div>
          </div>
          <Badge className="text-[10px] border-0 rounded-pill px-2.5"
            style={{ background: 'rgba(124,58,237,0.12)', color: '#9D5CF6' }}>
            <Sparkles className="w-3 h-3 mr-1" /> {t('aiPowered', language)}
          </Badge>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {errorText && (
            <div className="rounded-xl px-4 py-3 text-sm text-[var(--text-primary)]"
              style={{ border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.08)' }}>
              {errorText}
            </div>
          )}

          {/* Empty state */}
          {currentConversation.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-4"
                style={{ boxShadow: '0 0 40px rgba(124,58,237,0.3)' }}>
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-2">{t('howCanIHelp', language)}</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-6 max-w-md">
                {t('askAnything', language)}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); inputRef.current?.focus(); }}
                    className="text-left p-3 rounded-xl text-sm text-[var(--text-primary)] transition-all duration-150"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)';
                      e.currentTarget.style.background = 'rgba(124,58,237,0.06)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat messages */}
          {currentConversation.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0 mt-1"
                  style={{ boxShadow: '0 0 12px rgba(124,58,237,0.3)' }}>
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className="max-w-[70%] px-4 py-3"
                style={msg.role === 'user' ? {
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px 4px 16px 16px',
                } : {
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(59,130,246,0.08))',
                  border: '1px solid rgba(124,58,237,0.2)',
                  borderRadius: '4px 16px 16px 16px',
                }}
              >
                <div className={`text-sm leading-relaxed max-w-none ${msg.role === 'user' ? 'prose prose-sm prose-invert prose-p:my-1 prose-ul:my-2 prose-li:my-0 prose-strong:text-current' : 'prose prose-sm prose-invert prose-p:my-1 prose-ul:my-2 prose-li:my-0 prose-strong:text-current'}`}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                <div className={`flex items-center gap-2 mt-2 text-[10px] flex-wrap ${msg.role === 'user' ? 'text-[var(--text-muted)] justify-end' : 'text-[var(--text-muted)]'}`}>
                  <Clock className="w-3 h-3" />
                  {msg.timestamp}
                  {msg.confidence && (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium"
                      style={{
                        background: msg.confidence === 'High' ? 'rgba(16,185,129,0.15)' :
                          msg.confidence === 'Medium' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                        color: msg.confidence === 'High' ? '#10B981' :
                          msg.confidence === 'Medium' ? '#F59E0B' : '#EF4444',
                      }}>
                      <span className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: msg.confidence === 'High' ? '#10B981' :
                            msg.confidence === 'Medium' ? '#F59E0B' : '#EF4444',
                        }} />
                      {msg.confidence} confidence
                    </div>
                  )}
                </div>
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-1 mt-2">
                    <button className="p-1.5 rounded-lg transition-colors text-[var(--text-muted)]"
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-lg transition-colors text-[var(--text-muted)]"
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-lg transition-colors text-[var(--text-muted)]"
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                {msg.sources && msg.sources.length > 0 && (msg.confidence === 'High' || msg.confidence === 'Medium') && (
                  <div className="mt-2 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="text-[10px] text-[var(--text-muted)] font-medium">{t('sources', language)}:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {msg.sources.map((src, i) => (
                        <a key={i} href={src.url} target="_blank" rel="noopener noreferrer"
                          className="text-[10px] px-2 py-1 rounded-lg cursor-pointer transition-colors inline-flex items-center gap-1"
                          style={{ background: 'rgba(124,58,237,0.12)', color: '#9D5CF6' }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(124,58,237,0.2)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(124,58,237,0.12)'; }}>
                          🔗 {src.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {msg.confidence === 'Low' && (
                  <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-[10px] text-[var(--text-muted)] mb-2">Try one of these:</p>
                    <div className="flex flex-wrap gap-2">
                      {["NPS withdrawal rules", "Tax benefits 80CCD", "NPS eligibility"].map((pill) => (
                        <button
                          key={pill}
                          onClick={() => { void sendPresetPrompt(pill); inputRef.current?.focus(); }}
                          className="text-[9px] px-2.5 py-1 rounded-full text-[var(--text-primary)] transition-colors"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(124,58,237,0.1)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}>
                          {pill}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {msg.calculatorUrl && (
                  <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <a href={msg.calculatorUrl} target="_blank" rel="noopener noreferrer"
                      className="text-[10px] inline-flex items-center gap-1 px-2 py-1 rounded-lg transition-colors"
                      style={{ background: 'rgba(59,130,246,0.12)', color: '#3B82F6' }}>
                      📊 Open NPS Calculator
                    </a>
                  </div>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1"
                  style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <User className="w-4 h-4 text-[var(--text-secondary)]" />
                </div>
              )}
            </motion.div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0"
                style={{ boxShadow: '0 0 12px rgba(124,58,237,0.3)' }}>
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="px-4 py-3 rounded-2xl" style={{ borderRadius: '4px 16px 16px 16px', background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(59,130,246,0.08))', border: '1px solid rgba(124,58,237,0.2)' }}>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#9D5CF6', animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#7C3AED', animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#3B82F6', animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Disclaimer */}
        <div className="px-4 py-2 text-center text-[10px] text-[var(--text-muted)] space-y-1"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(8,12,24,0.5)' }}>
          <p>Always verify important decisions at official portals</p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <a href="https://www.npscra.nsdl.co.in/" target="_blank" rel="noopener noreferrer" className="text-pp-purple hover:underline">
              npscra.nsdl.co.in
            </a>
            <span>•</span>
            <a href="https://www.epfindia.gov.in/" target="_blank" rel="noopener noreferrer" className="text-pp-purple hover:underline">
              epfindia.gov.in
            </a>
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-end gap-2 rounded-xl p-2"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('askAboutNps', language)}
                rows={1}
                className="w-full resize-none rounded-lg px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none bg-transparent"
              />
            </div>
            <span className="text-[10px] text-[var(--text-muted)] flex items-center gap-1 px-2 pb-2.5 shrink-0">
              <Command className="w-3 h-3" /> Enter
            </span>
            <button className="p-2.5 rounded-lg text-[var(--text-muted)] transition-colors shrink-0"
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
              <Mic className="w-5 h-5" />
            </button>
            <button
              onClick={() => void handleSend()}
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 shrink-0 disabled:opacity-30"
              style={{
                background: input.trim() ? 'linear-gradient(135deg, #7C3AED, #9D5CF6)' : 'rgba(255,255,255,0.05)',
                color: '#fff',
                boxShadow: input.trim() ? '0 4px 15px rgba(124,58,237,0.4)' : 'none',
              }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

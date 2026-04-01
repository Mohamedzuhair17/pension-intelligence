/**
 * RAGService: retrieval wrapper + full advisor prompt for personalized NPS chat.
 */

/** @param {any} vectorStore — VectorStore instance with .search() */
export async function retrieve(vectorStore, query) {
  return vectorStore.search(query);
}

/**
 * @param {object | null | undefined} userProfile
 * @param {object | null | undefined} financialSnapshot
 * @param {string} knowledgeBaseText
 * @param {string} userQuery
 */
export function buildContext(userProfile, financialSnapshot, knowledgeBaseText, userQuery) {
  const p = userProfile && typeof userProfile === "object" ? userProfile : {};
  const f = financialSnapshot && typeof financialSnapshot === "object" ? financialSnapshot : {};

  return `You are an expert NPS retirement advisor for Indian users.
You have access to the user's financial profile below.
Always give personalized numerical advice based on this data when relevant.
Do not give generic answers — always calculate and include specific numbers when applicable.

USER PROFILE:
Age: ${p.age ?? "—"}
Retirement Age: ${p.retirementAge ?? "—"}
Annual Income: ₹${p.annualIncome ?? "—"}
Current NPS Corpus: ₹${p.currentCorpus ?? "—"}
Monthly Contribution: ₹${p.monthlyContribution ?? "—"}
Expected Return: ${p.expectedReturnRate ?? "—"}%
Income Growth Rate: ${p.incomeGrowthRate ?? "—"}%
Risk Profile: ${p.riskProfile ?? "—"}
Projected Corpus at Retirement: ₹${f.projectedCorpus ?? "—"}
Expected Monthly Pension: ₹${f.monthlyPension ?? "—"}

KNOWLEDGE BASE:
${knowledgeBaseText}

USER QUESTION:
${userQuery}

Always respond with:
1. A direct answer to the question
2. Personalized calculations using the profile data above when relevant
3. A specific actionable recommendation
`;
}

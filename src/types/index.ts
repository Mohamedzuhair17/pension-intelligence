export type RiskProfile = 'Conservative' | 'Moderate' | 'Aggressive';

export type NpsTierPreference = 'Tier I' | 'Tier II' | 'Both';

export type FundManagerOption =
  | 'SBI'
  | 'HDFC'
  | 'ICICI'
  | 'Kotak'
  | 'Axis'
  | 'UTI'
  | 'LIC';

export type WithdrawalMode = 'normal' | 'premature';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender?: 'Male' | 'Female' | 'Other';
  city?: string;
  state?: string;
  npsAccountNumber?: string;
  subscriberType: 'Individual' | 'Government' | 'Corporate';
  /** Legacy + extended: Both = Tier I + Tier II */
  tier: 'Tier I' | 'Tier II' | 'Both';
  accountStatus: 'Active' | 'Pending' | 'Inactive';
  avatar?: string;
  language: string;
  createdAt: string;
  onboardingComplete?: boolean;
  /** 0–4 while onboarding in progress (optional, for progress bar) */
  onboardingStep?: number;
  /** Annual income in ₹ */
  annualIncome?: number;
  monthlyNpsContribution?: number;
  annualContributionIncrease?: number;
  incomeGrowthRate?: number;
  expectedReturnRate?: number;
  targetRetirementAge?: number;
  targetCorpus?: number;
  riskProfile?: RiskProfile;
  /** Optional PRAN stored; display masked */
  pran?: string;
  npsTierPreference?: NpsTierPreference;
  fundManagerPreference?: FundManagerOption;
  /** Annuity rate % for pension estimate (default 6) */
  annuityRate?: number;
  npsData?: {
    totalCorpus: number;
    totalContributions: number;
    totalReturns: number;
    monthlyPension: number;
    taxSaved: number;
    thisYearContribution: number;
    annualContributionTarget: number;
    age: number;
    retirementAge: number;
    yearsToRetirement: number;
    equityAllocation: number;
    bondAllocation: number;
    govSecAllocation: number;
    fundManager: string;
    lastContributionDate: string;
    contributionHistory: Array<{ month: string; amount: number }>;
    corpusGrowthHistory: Array<{ year: string; corpus: number }>;
    /** Last projected corpus from engine (for assistant context) */
    projectedCorpusAtRetirement?: number;
  };
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  language?: string;
  timestamp: string;
  confidence?: 'High' | 'Medium' | 'Low';
  sources?: Array<{ name: string; url: string }>;
  calculatorUrl?: string;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  messageCount: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  read: boolean;
  timestamp: string;
}

/** Calculator + engine inputs (Feature 5). */
export interface CalculatorInput {
  age: number;
  retirementAge: number;
  currentIncome: number;
  incomeGrowth: number;
  inflationRate: number;
  /** Monthly NPS contribution in ₹ */
  monthlyContribution: number;
  contributionIncrease: number;
  equityAllocation: number;
  corporateBondAllocation: number;
  govSecAllocation: number;
  expectedReturn: number;
  currentBalance: number;
  /** Annual annuity yield on annuity corpus (4–8% UI) */
  annuityRate: number;
  withdrawalMode: WithdrawalMode;
}

export interface CalculatorResult {
  projectedCorpus: number;
  monthlyPension: number;
  lumpSum: number;
  totalContributions: number;
  totalReturns: number;
  yearlyProjections: YearlyProjection[];
}

/** Row in year-wise table / chart */
export interface YearlyProjection {
  age: number;
  year: number;
  contribution: number;
  returns: number;
  corpus: number;
  taxBenefit: number;
}

/** Output of FinancialEngine.yearByYearSimulation */
export interface FinancialSimulationResult {
  projectedCorpus: number;
  /** Sum of monthly contributions only (excludes initial corpus) */
  totalContributions: number;
  totalReturns: number;
  initialCorpus: number;
  yearsRemaining: number;
  yearlyBreakdown: YearlyProjection[];
  lumpSumWithdrawal?: number;
  annuityAmount?: number;
  monthlyPension?: number;
  /** Monthly SIP after last simulated year */
  finalMonthlyContribution?: number;
}

export type InsightCategory =
  | 'contribution'
  | 'projection'
  | 'earlyRetirement'
  | 'tax'
  | 'risk'
  | 'pension'
  | 'goal';

export interface Insight {
  category: InsightCategory;
  title: string;
  description: string;
  /** Highlight number or short metric */
  value: string;
  actionableTip: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  npsAccountNumber?: string;
  subscriberType: 'Individual' | 'Government' | 'Corporate';
  tier: 'Tier I' | 'Tier II';
  accountStatus: 'Active' | 'Pending' | 'Inactive';
  avatar?: string;
  language: string;
  createdAt: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  language?: string;
  timestamp: string;
  confidence?: 'High' | 'Medium' | 'Low';
  sources?: string[];
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

export interface CalculatorInput {
  age: number;
  retirementAge: number;
  currentIncome: number;
  incomeGrowth: number;
  inflationRate: number;
  annualContribution: number;
  contributionIncrease: number;
  equityAllocation: number;
  corporateBondAllocation: number;
  govSecAllocation: number;
  expectedReturn: number;
  currentBalance: number;
  annuityPercentage: number;
}

export interface CalculatorResult {
  projectedCorpus: number;
  monthlyPension: number;
  lumpSum: number;
  totalContributions: number;
  totalReturns: number;
  yearlyProjections: YearlyProjection[];
}

export interface YearlyProjection {
  age: number;
  year: number;
  contribution: number;
  returns: number;
  corpus: number;
  taxBenefit: number;
}

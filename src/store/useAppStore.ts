import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, Notification, Conversation, Message } from '@/types';
import { syncNpsDerivedData } from '@/services/userProfileService';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  notifications: Notification[];
  conversations: Conversation[];
  currentConversation: Message[];
  sidebarOpen: boolean;
  language: string;
  setUser: (user: User | null) => void;
  setAuthenticated: (auth: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  setLanguage: (lang: string) => void;
  addNotification: (n: Notification) => void;
  markNotificationRead: (id: string) => void;
  addMessage: (msg: Message) => void;
  clearConversation: () => void;
}

/** Demo account: onboarding complete, full npsData. */
export const mockUser: User = {
  id: '1',
  fullName: 'Rajesh Kumar',
  email: 'rajesh.kumar@example.com',
  phone: '+91 98765 43210',
  dob: '1985-03-15',
  gender: 'Male',
  city: 'Mumbai',
  state: 'Maharashtra',
  npsAccountNumber: 'XXXX XXXX 4521',
  subscriberType: 'Individual',
  tier: 'Tier I',
  accountStatus: 'Active',
  language: 'en',
  createdAt: '2022-01-15',
  onboardingComplete: true,
  annualIncome: 1200000,
  monthlyNpsContribution: 10000,
  annualContributionIncrease: 5,
  incomeGrowthRate: 8,
  expectedReturnRate: 10,
  targetRetirementAge: 60,
  targetCorpus: 50000000,
  riskProfile: 'Moderate',
  annuityRate: 6,
  fundManagerPreference: 'SBI',
  npsTierPreference: 'Tier I',
  npsData: {
    totalCorpus: 520000,
    totalContributions: 300000,
    totalReturns: 220000,
    monthlyPension: 28500,
    taxSaved: 15000,
    thisYearContribution: 37500,
    annualContributionTarget: 100000,
    age: 38,
    retirementAge: 60,
    yearsToRetirement: 22,
    equityAllocation: 55,
    bondAllocation: 30,
    govSecAllocation: 15,
    fundManager: 'SBI Pension Funds',
    lastContributionDate: '2025-03-15',
    contributionHistory: [
      { month: 'Sep', amount: 5000 },
      { month: 'Oct', amount: 5000 },
      { month: 'Nov', amount: 7500 },
      { month: 'Dec', amount: 5000 },
      { month: 'Jan', amount: 10000 },
      { month: 'Feb', amount: 5000 },
    ],
    corpusGrowthHistory: [
      { year: '2022', corpus: 120000 },
      { year: '2023', corpus: 245000 },
      { year: '2024', corpus: 398000 },
      { year: '2025', corpus: 520000 },
    ],
  },
};

/** First-time user after registration — must complete onboarding. */
export function createFreshUser(): User {
  const id =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `u-${Date.now()}`;
  const base: User = {
    id,
    fullName: 'New User',
    email: 'newuser@example.com',
    phone: '+91 00000 00000',
    dob: '1995-01-01',
    subscriberType: 'Individual',
    tier: 'Tier I',
    accountStatus: 'Active',
    language: 'en',
    createdAt: new Date().toISOString().slice(0, 10),
    onboardingComplete: false,
    onboardingStep: 0,
    monthlyNpsContribution: 0,
    annualContributionIncrease: 5,
    incomeGrowthRate: 8,
    expectedReturnRate: 10,
    targetRetirementAge: 60,
    riskProfile: 'Moderate',
    annuityRate: 6,
    npsData: {
      totalCorpus: 0,
      totalContributions: 0,
      totalReturns: 0,
      monthlyPension: 0,
      taxSaved: 0,
      thisYearContribution: 0,
      annualContributionTarget: 150000,
      age: 30,
      retirementAge: 60,
      yearsToRetirement: 30,
      equityAllocation: 50,
      bondAllocation: 30,
      govSecAllocation: 20,
      fundManager: 'SBI Pension Funds',
      lastContributionDate: new Date().toISOString().slice(0, 10),
      contributionHistory: [],
      corpusGrowthHistory: [],
    },
  };
  return syncNpsDerivedData(base);
}

const mockNotifications: Notification[] = [
  { id: '1', title: 'Contribution Due', message: 'Your monthly NPS contribution is due on March 25th', type: 'warning', read: false, timestamp: '2h ago' },
  { id: '2', title: 'Tax Saving Alert', message: 'You can save up to ₹50,000 under Sec 80CCD(1B)', type: 'info', read: false, timestamp: '1d ago' },
  { id: '3', title: 'Account Updated', message: 'Your profile information was updated successfully', type: 'success', read: true, timestamp: '3d ago' },
];

const mockConversations: Conversation[] = [
  { id: '1', title: 'Tax benefits under NPS', lastMessage: 'You can claim deductions under...', timestamp: 'Today', messageCount: 4 },
  { id: '2', title: 'Withdrawal rules', lastMessage: 'Partial withdrawal is allowed after...', timestamp: 'Yesterday', messageCount: 6 },
  { id: '3', title: 'Fund allocation strategy', lastMessage: 'For your age group, a balanced...', timestamp: '3 days ago', messageCount: 3 },
];

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      notifications: mockNotifications,
      conversations: mockConversations,
      currentConversation: [],
      sidebarOpen: true,
      language: 'en',
      setUser: (user) => set({ user: user ? syncNpsDerivedData(user) : null }),
      setAuthenticated: (auth) => set({ isAuthenticated: auth }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setLanguage: (lang) => set({ language: lang }),
      addNotification: (n) => set((s) => ({ notifications: [n, ...s.notifications] })),
      markNotificationRead: (id) =>
        set((s) => ({
          notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
        })),
      addMessage: (msg) => set((s) => ({ currentConversation: [...s.currentConversation, msg] })),
      clearConversation: () => set({ currentConversation: [] }),
    }),
    {
      name: 'pension-pal-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

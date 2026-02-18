import { create } from 'zustand';
import type { User, Notification, Conversation, Message } from '@/types';

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

const mockUser: User = {
  id: '1',
  fullName: 'Rajesh Kumar',
  email: 'rajesh.kumar@example.com',
  phone: '+91 98765 43210',
  dob: '1985-03-15',
  npsAccountNumber: 'XXXX XXXX 4521',
  subscriberType: 'Individual',
  tier: 'Tier I',
  accountStatus: 'Active',
  language: 'en',
  createdAt: '2022-01-15',
};

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

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  notifications: mockNotifications,
  conversations: mockConversations,
  currentConversation: [],
  sidebarOpen: true,
  language: 'en',
  setUser: (user) => set({ user }),
  setAuthenticated: (auth) => set({ isAuthenticated: auth }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setLanguage: (lang) => set({ language: lang }),
  addNotification: (n) => set((s) => ({ notifications: [n, ...s.notifications] })),
  markNotificationRead: (id) => set((s) => ({
    notifications: s.notifications.map((n) => n.id === id ? { ...n, read: true } : n),
  })),
  addMessage: (msg) => set((s) => ({ currentConversation: [...s.currentConversation, msg] })),
  clearConversation: () => set({ currentConversation: [] }),
}));

export { mockUser };

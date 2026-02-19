import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MessageSquare, Calculator, FileText, Download, TrendingUp,
  IndianRupee, ArrowUpRight, Clock, Wallet, PiggyBank
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/useAppStore';
import { t } from '@/i18n/translations';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area
} from 'recharts';

const contributionData = [
  { month: 'Sep', amount: 5000 },
  { month: 'Oct', amount: 5000 },
  { month: 'Nov', amount: 7500 },
  { month: 'Dec', amount: 5000 },
  { month: 'Jan', amount: 10000 },
  { month: 'Feb', amount: 5000 },
];

const corpusData = [
  { year: '2022', corpus: 120000 },
  { year: '2023', corpus: 245000 },
  { year: '2024', corpus: 398000 },
  { year: '2025', corpus: 520000 },
];

const recentChats = [
  { title: 'Tax benefits under NPS', time: '2 hours ago', snippet: 'You can claim deductions under Section 80CCD...' },
  { title: 'Withdrawal rules for Tier I', time: 'Yesterday', snippet: 'Partial withdrawal is allowed after 3 years...' },
  { title: 'Fund allocation strategy', time: '3 days ago', snippet: 'For age 38, a balanced allocation of 50% equity...' },
];

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const user = useAppStore((s) => s.user);
  const language = useAppStore((s) => s.language);

  const quickActions = [
    { label: t('askAIAssistant', language), icon: MessageSquare, path: '/assistant', color: 'bg-saffron-light text-saffron' },
    { label: t('calculatePension', language), icon: Calculator, path: '/calculator', color: 'bg-emerald-light text-emerald' },
    { label: t('taxDocuments', language), icon: Download, path: '/documents', color: 'bg-sky-light text-sky' },
    { label: t('accountStatement', language), icon: FileText, path: '/documents', color: 'bg-amber-light text-amber' },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.06 } } }}
      className="space-y-6 max-w-7xl"
    >
      {/* Welcome */}
      <motion.div variants={item}>
        <Card className="gradient-hero border-0 overflow-hidden">
          <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-emerald/20 text-emerald border-0 text-xs">
                  {user?.accountStatus || 'Active'}
                </Badge>
                <Badge variant="secondary" className="bg-primary-foreground/10 text-primary-foreground/80 border-0 text-xs">
                  {user?.tier || 'Tier I'}
                </Badge>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground mb-1">
                {t('welcomeBack', language)}, {user?.fullName?.split(' ')[0] || 'User'}
              </h1>
              <p className="text-primary-foreground/60 text-sm">
                {t('accountHealthMsg', language)}
              </p>
            </div>
            <div className="flex gap-2">
              <Link to="/assistant">
                <Button size="sm" className="gradient-accent text-accent-foreground font-semibold shadow-lg">
                  <MessageSquare className="w-4 h-4 mr-1.5" /> {t('askAI', language)}
                </Button>
              </Link>
              <Link to="/calculator">
                <Button size="sm" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  <Calculator className="w-4 h-4 mr-1.5" /> {t('calculate', language)}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('totalCorpus', language), value: '₹5,20,000', change: '+12.4%', icon: PiggyBank, colorClass: 'bg-saffron-light text-saffron' },
          { label: t('thisYearContribution', language), value: '₹37,500', change: '₹62,500 left', icon: Wallet, colorClass: 'bg-emerald-light text-emerald' },
          { label: t('taxSaved', language), value: '₹15,000', change: 'Sec 80CCD', icon: IndianRupee, colorClass: 'bg-sky-light text-sky' },
          { label: t('estMonthlyPension', language), value: '₹28,500', change: 'at age 60', icon: TrendingUp, colorClass: 'bg-amber-light text-amber' },
        ].map((stat) => (
          <motion.div key={stat.label} variants={item}>
            <Card className="shadow-card hover:shadow-elevated transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${stat.colorClass} flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-muted-foreground">{stat.change}</span>
                </div>
                <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div variants={item}>
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-base">{t('monthlyContributions', language)}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={contributionData}>
                  <defs>
                    <linearGradient id="contribGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(28, 90%, 52%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(28, 90%, 52%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 90%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                  <Tooltip />
                  <Area type="monotone" dataKey="amount" stroke="hsl(28, 90%, 52%)" fill="url(#contribGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-base">{t('corpusGrowth', language)}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={corpusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 90%)" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                  <Tooltip />
                  <Line type="monotone" dataKey="corpus" stroke="hsl(222, 60%, 18%)" strokeWidth={2.5} dot={{ fill: 'hsl(222, 60%, 18%)', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions + Recent Chats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div variants={item} className="lg:col-span-1">
          <Card className="shadow-card h-full">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base">{t('quickActions', language)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickActions.map((action) => (
                <Link key={action.label} to={action.path}>
                  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors cursor-pointer group">
                    <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center`}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-foreground flex-1">{action.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-card h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="font-display text-base">{t('recentConversations', language)}</CardTitle>
                <Link to="/assistant" className="text-xs text-accent hover:underline">{t('viewAll', language)}</Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentChats.map((chat) => (
                <Link key={chat.title} to="/assistant">
                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary transition-colors cursor-pointer">
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{chat.title}</span>
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {chat.time}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{chat.snippet}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

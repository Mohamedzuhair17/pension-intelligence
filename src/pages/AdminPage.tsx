import { motion } from 'framer-motion';
import {
  Users, MessageSquare, TrendingUp, Clock,
  Shield, Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/useAppStore';
import { t } from '@/i18n/translations';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line
} from 'recharts';

const userGrowthData = [
  { month: 'Sep', users: 1200 },
  { month: 'Oct', users: 1580 },
  { month: 'Nov', users: 2100 },
  { month: 'Dec', users: 2450 },
  { month: 'Jan', users: 3200 },
  { month: 'Feb', users: 4100 },
];

const chatUsageData = [
  { day: 'Mon', chats: 340 },
  { day: 'Tue', chats: 420 },
  { day: 'Wed', chats: 380 },
  { day: 'Thu', chats: 510 },
  { day: 'Fri', chats: 450 },
  { day: 'Sat', chats: 220 },
  { day: 'Sun', chats: 180 },
];

const recentUsers = [
  { name: 'Priya Sharma', email: 'priya@example.com', status: 'Active', joined: '2 hours ago' },
  { name: 'Amit Patel', email: 'amit@example.com', status: 'Active', joined: '5 hours ago' },
  { name: 'Sunita Reddy', email: 'sunita@example.com', status: 'Pending', joined: '1 day ago' },
  { name: 'Karan Singh', email: 'karan@example.com', status: 'Active', joined: '2 days ago' },
];

export default function AdminPage() {
  const language = useAppStore((s) => s.language);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <Shield className="w-6 h-6 text-accent" /> {t('adminDashboard', language)}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{t('systemOverview', language)}</p>
        </div>
        <Badge className="bg-emerald/10 text-emerald border-0">
          <Activity className="w-3 h-3 mr-1" /> {t('allSystemsNormal', language)}
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('totalUsers', language), value: '4,128', change: '+12%', icon: Users, color: 'bg-saffron-light text-saffron' },
          { label: t('activeConversations', language), value: '342', change: 'Today', icon: MessageSquare, color: 'bg-emerald-light text-emerald' },
          { label: t('avgResponseTime', language), value: '2.4s', change: '-0.3s', icon: Clock, color: 'bg-sky-light text-sky' },
          { label: t('csatScore', language), value: '4.6/5', change: '+0.2', icon: TrendingUp, color: 'bg-amber-light text-amber' },
        ].map((stat) => (
          <Card key={stat.label} className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-xs text-muted-foreground">{stat.change}</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-base">{t('userGrowth', language)}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="hsl(28, 90%, 52%)" strokeWidth={2.5} dot={{ fill: 'hsl(28, 90%, 52%)', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-base">{t('dailyChatVolume', language)}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chatUsageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 90%)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                <Tooltip />
                <Bar dataKey="chats" fill="hsl(222, 60%, 18%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Users */}
      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="font-display text-base">{t('recentRegistrations', language)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-muted-foreground font-medium">{t('name', language)}</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">{t('email', language)}</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">{t('status', language)}</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">{t('joined', language)}</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((u) => (
                  <tr key={u.email} className="border-b border-border/50 hover:bg-secondary/50">
                    <td className="p-3 font-medium text-foreground">{u.name}</td>
                    <td className="p-3 text-muted-foreground">{u.email}</td>
                    <td className="p-3">
                      <Badge className={u.status === 'Active' ? 'bg-emerald/10 text-emerald border-0' : 'bg-amber/10 text-amber border-0'}>
                        {u.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-muted-foreground">{u.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

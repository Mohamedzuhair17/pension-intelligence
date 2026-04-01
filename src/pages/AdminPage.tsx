import { motion } from 'framer-motion';
import {
  Users, MessageSquare, TrendingUp, Clock,
  Shield, Activity, Edit, Pause, Trash2
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

  const statCards = [
    { label: t('totalUsers', language), value: '4,128', change: '+12%', icon: Users, iconColor: '#7C3AED', iconBg: 'rgba(124,58,237,0.15)' },
    { label: t('activeConversations', language), value: '342', change: 'Today', icon: MessageSquare, iconColor: '#10B981', iconBg: 'rgba(16,185,129,0.15)' },
    { label: t('avgResponseTime', language), value: '2.4s', change: '-0.3s', icon: Clock, iconColor: '#3B82F6', iconBg: 'rgba(59,130,246,0.15)' },
    { label: t('csatScore', language), value: '4.6/5', change: '+0.2', icon: TrendingUp, iconColor: '#F59E0B', iconBg: 'rgba(245,158,11,0.15)' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Shield className="w-6 h-6 text-pp-purple" /> {t('adminDashboard', language)}
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">{t('systemOverview', language)}</p>
        </div>
        <Badge className="text-[10px] border-0 rounded-pill px-3 py-1" style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981' }}>
          <Activity className="w-3 h-3 mr-1" /> {t('allSystemsNormal', language)}
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div key={stat.label} className="rounded-2xl p-5 hover-lift gradient-border" style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: stat.iconBg }}>
                <stat.icon className="w-5 h-5" style={{ color: stat.iconColor }} />
              </div>
              <span className="text-[10px] font-medium px-2 py-1 rounded-pill" style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981' }}>{stat.change}</span>
            </div>
            <p className="font-mono text-2xl font-bold text-[var(--text-primary)] tracking-tight">{stat.value}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-card border-0" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px' }}>
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-base text-[var(--text-primary)]">{t('userGrowth', language)}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#475569' }} stroke="transparent" />
                <YAxis tick={{ fontSize: 12, fill: '#475569' }} stroke="transparent" />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#7C3AED" strokeWidth={2.5}
                  dot={{ fill: '#9D5CF6', r: 4, strokeWidth: 2, stroke: '#0D1120' }}
                  activeDot={{ r: 6, fill: '#9D5CF6', stroke: '#0D1120', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px' }}>
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-base text-[var(--text-primary)]">{t('dailyChatVolume', language)}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chatUsageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#475569' }} stroke="transparent" />
                <YAxis tick={{ fontSize: 12, fill: '#475569' }} stroke="transparent" />
                <Tooltip />
                <Bar dataKey="chats" fill="#3B82F6" radius={[6, 6, 0, 0]}
                  style={{ filter: 'drop-shadow(0 2px 8px rgba(59,130,246,0.3))' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Users Table */}
      <Card className="shadow-card border-0" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px' }}>
        <CardHeader className="pb-2">
          <CardTitle className="font-display text-base text-[var(--text-primary)]">{t('recentRegistrations', language)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <th className="text-left p-3 text-[var(--text-muted)] font-medium text-xs">{t('name', language)}</th>
                  <th className="text-left p-3 text-[var(--text-muted)] font-medium text-xs">{t('email', language)}</th>
                  <th className="text-left p-3 text-[var(--text-muted)] font-medium text-xs">{t('status', language)}</th>
                  <th className="text-left p-3 text-[var(--text-muted)] font-medium text-xs">{t('joined', language)}</th>
                  <th className="text-right p-3 text-[var(--text-muted)] font-medium text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((u, idx) => (
                  <tr key={u.email}
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.03)',
                      background: idx % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(124,58,237,0.04)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = idx % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent'; }}>
                    <td className="p-3 font-medium text-[var(--text-primary)]">{u.name}</td>
                    <td className="p-3 text-[var(--text-secondary)]">{u.email}</td>
                    <td className="p-3">
                      <Badge className="text-[10px] px-2 py-0.5 border-0 rounded-pill"
                        style={{
                          background: u.status === 'Active' ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)',
                          color: u.status === 'Active' ? '#10B981' : '#F59E0B',
                        }}>
                        {u.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-[var(--text-secondary)]">{u.joined}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-lg transition-colors text-[var(--text-muted)]"
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(59,130,246,0.1)'; e.currentTarget.style.color = '#3B82F6'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg transition-colors text-[var(--text-muted)]"
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(245,158,11,0.1)'; e.currentTarget.style.color = '#F59E0B'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                          <Pause className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg transition-colors text-[var(--text-muted)]"
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = '#EF4444'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
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

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, MessageSquare, Calculator, User, Settings,
  HelpCircle, Shield, LogOut, ChevronLeft, ChevronRight, TrendingUp, Sparkles
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { t } from '@/i18n/translations';
import { cn } from '@/lib/utils';

const navSections = [
  {
    label: 'MAIN',
    items: [
      { path: '/dashboard', labelKey: 'dashboard' as const, icon: LayoutDashboard },
      { path: '/assistant', labelKey: 'aiAssistant' as const, icon: MessageSquare, badge: 'NEW' },
      { path: '/calculator', labelKey: 'pensionCalculator' as const, icon: Calculator },
    ],
  },
  {
    label: 'ACCOUNT',
    items: [
      { path: '/profile', labelKey: 'myProfile' as const, icon: User },
      { path: '/settings', labelKey: 'settings' as const, icon: Settings },
    ],
  },
  {
    label: 'SUPPORT',
    items: [
      { path: '/help', labelKey: 'helpFaq' as const, icon: HelpCircle },
    ],
  },
  {
    label: 'ADMIN',
    items: [
      { path: '/admin', labelKey: 'adminPanel' as const, icon: Shield },
    ],
  },
];

export default function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sidebarOpen, setSidebarOpen, setAuthenticated, setUser, language, user } = useAppStore();

  const handleLogout = () => {
    setAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 240 : 64 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen z-40 flex flex-col"
      style={{
        backgroundColor: 'var(--bg-base)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 gradient-primary shadow-lg">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col"
          >
            <span className="font-display font-bold text-sm whitespace-nowrap text-gradient">
              Pension Pal
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">v2.0 Pro</span>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 overflow-y-auto space-y-1">
        {navSections.map((section, sIdx) => (
          <div key={section.label}>
            {/* Section label */}
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-3 pt-4 pb-2"
              >
                <span className="micro-label text-[10px]">{section.label}</span>
              </motion.div>
            )}
            {!sidebarOpen && sIdx > 0 && (
              <div className="mx-3 my-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }} />
            )}

            {/* Nav items */}
            {section.items.map((item, idx) => {
              const active = location.pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (sIdx * 3 + idx) * 0.03 }}
                >
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-sm relative group",
                      active
                        ? "nav-active-indicator"
                        : "hover:bg-[rgba(124,58,237,0.08)]"
                    )}
                    style={active ? {
                      background: 'rgba(124,58,237,0.12)',
                      color: 'var(--accent-purple-light)',
                    } : {
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <item.icon
                      className={cn(
                        "w-5 h-5 shrink-0 transition-colors duration-150",
                        active ? "text-pp-purple-light" : "text-[var(--text-muted)] group-hover:text-pp-purple"
                      )}
                    />
                    {sidebarOpen && (
                      <span className={cn(
                        "whitespace-nowrap flex-1 transition-colors duration-150",
                        active ? "font-semibold" : "font-medium group-hover:text-[var(--text-primary)]"
                      )}>
                        {t(item.labelKey, language)}
                      </span>
                    )}
                    {sidebarOpen && 'badge' in item && item.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-pill bg-pp-purple text-white tracking-wide">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="p-2 space-y-1 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        {/* User mini-profile */}
        {sidebarOpen && user && (
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user.fullName?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[var(--text-primary)] truncate">{user.fullName?.split(' ')[0]}</p>
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-pill inline-block mt-0.5"
                style={{ background: 'rgba(124,58,237,0.15)', color: 'var(--accent-purple-light)' }}
              >
                PRO
              </span>
            </div>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-sm w-full group"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--danger)';
            e.currentTarget.style.background = 'rgba(239,68,68,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {sidebarOpen && <span>{t('logout', language)}</span>}
        </button>

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center justify-center w-full py-2 rounded-xl transition-all duration-150"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </motion.aside>
  );
}

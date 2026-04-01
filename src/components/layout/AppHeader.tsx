import { useLocation } from 'react-router-dom';
import { Bell, Globe, Search, User } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { t } from '@/i18n/translations';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'mr', label: 'मराठी' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
];

const routeTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/assistant': 'AI Assistant',
  '/calculator': 'Pension Calculator',
  '/profile': 'My Profile',
  '/settings': 'Settings',
  '/help': 'Help & FAQ',
  '/admin': 'Admin Panel',
};

export default function AppHeader() {
  const { user, notifications, language, setLanguage, markNotificationRead } = useAppStore();
  const unreadCount = notifications.filter((n) => !n.read).length;
  const location = useLocation();
  const pageTitle = routeTitles[location.pathname] || 'Dashboard';

  const handleSetLanguage = (code: string) => {
    setLanguage(code);
    localStorage.setItem('app-language', code);
  };

  return (
    <header
      className="h-16 flex items-center justify-between px-6 sticky top-0 z-30 overflow-visible"
      style={{
        background: 'rgba(8,12,24,0.8)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Left: Page title */}
      <div className="flex items-center gap-3 flex-1">
        <div>
          <h2 className="font-display font-semibold text-[var(--text-primary)] text-lg leading-tight">
            {pageTitle}
          </h2>
          <p className="text-[11px] text-[var(--text-muted)]">
            {t('hello', language)}, {user?.fullName?.split(' ')[0] || 'User'} 👋
          </p>
        </div>
      </div>

      {/* Right: Icon buttons */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'var(--text-secondary)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)';
            e.currentTarget.style.background = 'rgba(124,58,237,0.1)';
            e.currentTarget.style.color = 'var(--accent-purple-light)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
          aria-label={t('search', language)}
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Language */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)';
                e.currentTarget.style.background = 'rgba(124,58,237,0.1)';
                e.currentTarget.style.color = 'var(--accent-purple-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              <Globe className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => handleSetLanguage(lang.code)}
                className={language === lang.code ? 'bg-pp-purple-dim text-pp-purple-light font-medium' : ''}
              >
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150 relative"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)';
                e.currentTarget.style.background = 'rgba(124,58,237,0.1)';
                e.currentTarget.style.color = 'var(--accent-purple-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
              aria-label={t('notifications', language)}
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center pointer-events-none"
                  style={{ background: 'var(--danger)' }}
                >
                  {unreadCount}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="px-3 py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <span className="font-display font-semibold text-sm text-[var(--text-primary)]">{t('notifications', language)}</span>
            </div>
            {notifications.slice(0, 5).map((n) => (
              <DropdownMenuItem key={n.id} onClick={() => markNotificationRead(n.id)} className="flex flex-col items-start gap-0.5 py-2.5">
                <div className="flex items-center gap-2 w-full">
                  <span className="font-medium text-sm text-[var(--text-primary)]">{n.title}</span>
                  {!n.read && (
                    <Badge className="text-[9px] px-1.5 py-0 bg-pp-purple-dim text-pp-purple-light border-0">
                      New
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-[var(--text-secondary)]">{n.message}</span>
                <span className="text-[10px] text-[var(--text-muted)]">{n.timestamp}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Avatar */}
        <div className="relative">
          <div
            className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white font-semibold text-sm"
            style={{ boxShadow: '0 2px 12px rgba(124,58,237,0.3)' }}
          >
            {user?.fullName?.charAt(0) || 'U'}
          </div>
          {/* Online dot */}
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
            style={{
              background: 'var(--success)',
              borderColor: 'var(--bg-base)',
              boxShadow: '0 0 6px rgba(16,185,129,0.5)',
            }}
          />
        </div>
      </div>
    </header>
  );
}

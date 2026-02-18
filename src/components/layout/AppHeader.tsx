import { Bell, Globe, Search } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
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

export default function AppHeader() {
  const { user, notifications, language, setLanguage, markNotificationRead } = useAppStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <h2 className="font-display font-semibold text-foreground text-lg">
          Hello, {user?.fullName?.split(' ')[0] || 'User'} 👋
        </h2>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
          <Search className="w-5 h-5" />
        </button>

        {/* Language */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex items-center gap-1.5">
              <Globe className="w-5 h-5" />
              <span className="text-xs font-medium hidden sm:inline">
                {languages.find((l) => l.code === language)?.label || 'English'}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            {languages.map((lang) => (
              <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)}>
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="px-3 py-2 border-b border-border">
              <span className="font-display font-semibold text-sm">Notifications</span>
            </div>
            {notifications.slice(0, 5).map((n) => (
              <DropdownMenuItem key={n.id} onClick={() => markNotificationRead(n.id)} className="flex flex-col items-start gap-0.5 py-2.5">
                <div className="flex items-center gap-2 w-full">
                  <span className="font-medium text-sm">{n.title}</span>
                  {!n.read && <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-accent/10 text-accent">New</Badge>}
                </div>
                <span className="text-xs text-muted-foreground">{n.message}</span>
                <span className="text-[10px] text-muted-foreground/60">{n.timestamp}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm ml-1">
          {user?.fullName?.charAt(0) || 'U'}
        </div>
      </div>
    </header>
  );
}

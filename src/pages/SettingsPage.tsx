import { motion } from 'framer-motion';
import { Settings, Globe, Bell, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useAppStore } from '@/store/useAppStore';
import { t } from '@/i18n/translations';

export default function SettingsPage() {
  const language = useAppStore((s) => s.language);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Settings className="w-6 h-6 text-pp-purple" /> {t('settings', language)}
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">{t('configurePrefs', language)}</p>
      </div>

      <Card className="shadow-card border-0" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px' }}>
        <CardHeader>
          <CardTitle className="font-display text-base flex items-center gap-2 text-[var(--text-primary)]">
            <Globe className="w-4 h-4 text-pp-purple" /> {t('general', language)}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { title: t('autoDetectLanguage', language), desc: t('autoDetectLanguageDesc', language), defaultChecked: true },
            { title: t('showTranslation', language), desc: t('showTranslationDesc', language), defaultChecked: false },
            { title: t('compactMode', language), desc: t('compactModeDesc', language), defaultChecked: false },
          ].map((s) => (
            <div key={s.title} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">{s.title}</p>
                <p className="text-xs text-[var(--text-secondary)]">{s.desc}</p>
              </div>
              <Switch defaultChecked={s.defaultChecked} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-card border-0" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px' }}>
        <CardHeader>
          <CardTitle className="font-display text-base flex items-center gap-2 text-[var(--text-primary)]">
            <Bell className="w-4 h-4 text-pp-purple" /> {t('notificationSettings', language)}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { title: t('pushNotifications', language), desc: t('pushNotificationsDesc', language), defaultChecked: true },
            { title: t('soundAlerts', language), desc: t('soundAlertsDesc', language), defaultChecked: false },
            { title: t('quietHours', language), desc: t('quietHoursDesc', language), defaultChecked: true },
          ].map((s) => (
            <div key={s.title} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">{s.title}</p>
                <p className="text-xs text-[var(--text-secondary)]">{s.desc}</p>
              </div>
              <Switch defaultChecked={s.defaultChecked} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-card border-0" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px' }}>
        <CardHeader>
          <CardTitle className="font-display text-base flex items-center gap-2 text-[var(--text-primary)]">
            <Eye className="w-4 h-4 text-pp-purple" /> {t('privacy', language)}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { title: t('saveChatHistory', language), desc: t('saveChatHistoryDesc', language), defaultChecked: true },
            { title: t('analytics', language), desc: t('analyticsDesc', language), defaultChecked: true },
            { title: t('personalizedTips', language), desc: t('personalizedTipsDesc', language), defaultChecked: true },
          ].map((s) => (
            <div key={s.title} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">{s.title}</p>
                <p className="text-xs text-[var(--text-secondary)]">{s.desc}</p>
              </div>
              <Switch defaultChecked={s.defaultChecked} />
            </div>
          ))}
          <Separator className="bg-[rgba(255,255,255,0.06)]" />
          <div>
            <p className="text-sm font-medium text-[var(--text-primary)]">{t('downloadMyData', language)}</p>
            <p className="text-xs text-[var(--text-secondary)] mb-2">{t('downloadMyDataDesc', language)}</p>
            <button className="text-xs text-pp-purple hover:text-pp-purple-light transition-colors hover:underline">{t('requestDataExport', language)}</button>
          </div>
          <Separator className="bg-[rgba(255,255,255,0.06)]" />
          <div className="p-4 rounded-xl" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
            <p className="text-sm font-medium" style={{ color: '#EF4444' }}>Danger Zone</p>
            <p className="text-xs text-[var(--text-secondary)] mt-1">Permanently delete your account and all associated data.</p>
            <button className="mt-3 text-xs px-4 py-2 rounded-xl transition-colors"
              style={{ color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
              Delete Account
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

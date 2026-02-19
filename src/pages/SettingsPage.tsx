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
        <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
          <Settings className="w-6 h-6 text-accent" /> {t('settings', language)}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{t('configurePrefs', language)}</p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-display text-base flex items-center gap-2">
            <Globe className="w-4 h-4 text-accent" /> {t('general', language)}
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
                <p className="text-sm font-medium text-foreground">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
              <Switch defaultChecked={s.defaultChecked} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-display text-base flex items-center gap-2">
            <Bell className="w-4 h-4 text-accent" /> {t('notificationSettings', language)}
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
                <p className="text-sm font-medium text-foreground">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
              <Switch defaultChecked={s.defaultChecked} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-display text-base flex items-center gap-2">
            <Eye className="w-4 h-4 text-accent" /> {t('privacy', language)}
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
                <p className="text-sm font-medium text-foreground">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
              <Switch defaultChecked={s.defaultChecked} />
            </div>
          ))}
          <Separator />
          <div>
            <p className="text-sm font-medium text-foreground">{t('downloadMyData', language)}</p>
            <p className="text-xs text-muted-foreground mb-2">{t('downloadMyDataDesc', language)}</p>
            <button className="text-xs text-accent hover:underline">{t('requestDataExport', language)}</button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

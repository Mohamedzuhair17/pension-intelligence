import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Shield, Bell, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAppStore } from '@/store/useAppStore';
import { t } from '@/i18n/translations';

export default function ProfilePage() {
  const user = useAppStore((s) => s.user);
  const language = useAppStore((s) => s.language);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">{t('myProfile', language)}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('manageProfile', language)}</p>
      </div>

      {/* Profile Header */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground font-display text-3xl font-bold">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            <div className="flex-1">
              <h2 className="font-display text-xl font-bold text-foreground">{user?.fullName || 'User'}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-emerald/10 text-emerald border-0 text-xs">{user?.accountStatus}</Badge>
                <Badge variant="secondary" className="text-xs">{user?.subscriberType}</Badge>
                <Badge variant="secondary" className="text-xs">{user?.tier}</Badge>
              </div>
            </div>
            <Button variant="outline" size="sm">{t('editPhoto', language)}</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Info */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-base flex items-center gap-2">
              <User className="w-4 h-4 text-accent" /> {t('personalInformation', language)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs">{t('fullName', language)}</Label>
              <Input defaultValue={user?.fullName} className="h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs flex items-center gap-1"><Mail className="w-3 h-3" /> {t('email', language)}</Label>
              <Input defaultValue={user?.email} className="h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs flex items-center gap-1"><Phone className="w-3 h-3" /> {t('phone', language)}</Label>
              <Input defaultValue={user?.phone} className="h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs flex items-center gap-1"><Calendar className="w-3 h-3" /> {t('dateOfBirth', language)}</Label>
              <Input type="date" defaultValue={user?.dob} className="h-10" />
            </div>
            <Button className="gradient-primary text-primary-foreground w-full">{t('saveChanges', language)}</Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-base flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent" /> {t('security', language)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs">{t('npsAccount', language)}</Label>
              <Input defaultValue={user?.npsAccountNumber} disabled className="h-10" />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label className="text-xs">{t('currentPassword', language)}</Label>
              <Input type="password" placeholder={t('currentPassword', language)} className="h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">{t('newPassword', language)}</Label>
              <Input type="password" placeholder="Min. 12 characters" className="h-10" />
            </div>
            <Button variant="outline" className="w-full">{t('updatePassword', language)}</Button>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{t('twoFactorAuth', language)}</p>
                <p className="text-xs text-muted-foreground">{t('twoFactorDesc', language)}</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-base flex items-center gap-2">
              <Bell className="w-4 h-4 text-accent" /> {t('notificationSettings', language)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              t('contributionReminders', language),
              t('taxBenefitAlerts', language),
              t('withdrawalUpdates', language),
              t('systemAnnouncements', language),
            ].map((item) => (
              <div key={item} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{item}</span>
                <Switch defaultChecked />
              </div>
            ))}
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{t('emailNotifications', language)}</p>
                <p className="text-xs text-muted-foreground">{t('receiveEmailUpdates', language)}</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{t('smsNotifications', language)}</p>
                <p className="text-xs text-muted-foreground">{t('receiveSmsUpdates', language)}</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-base flex items-center gap-2">
              <Globe className="w-4 h-4 text-accent" /> {t('preferences', language)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs">{t('language', language)}</Label>
              <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground">
                <option>English</option>
                <option>हिन्दी (Hindi)</option>
                <option>தமிழ் (Tamil)</option>
                <option>తెలుగు (Telugu)</option>
                <option>বাংলা (Bengali)</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">{t('dateFormat', language)}</Label>
              <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground">
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
            <Separator />
            <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
              <p className="text-sm font-medium text-destructive">{t('dangerZone', language)}</p>
              <p className="text-xs text-muted-foreground mt-1">{t('deleteAccountDesc', language)}</p>
              <Button variant="outline" size="sm" className="mt-3 text-destructive border-destructive/30 hover:bg-destructive/10">
                {t('deleteAccount', language)}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

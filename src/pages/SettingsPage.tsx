import { motion } from 'framer-motion';
import { Settings, Globe, Bell, Shield, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
          <Settings className="w-6 h-6 text-accent" /> Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Configure your application preferences</p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-display text-base flex items-center gap-2">
            <Globe className="w-4 h-4 text-accent" /> General
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { title: 'Auto-detect Language', desc: 'Automatically detect the language of your messages', defaultChecked: true },
            { title: 'Show Translation', desc: 'Display original + translated text side by side', defaultChecked: false },
            { title: 'Compact Mode', desc: 'Reduce spacing for more content on screen', defaultChecked: false },
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
            <Bell className="w-4 h-4 text-accent" /> Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { title: 'Push Notifications', desc: 'Browser push notifications for important updates', defaultChecked: true },
            { title: 'Sound Alerts', desc: 'Play sound for new notifications', defaultChecked: false },
            { title: 'Quiet Hours', desc: 'Mute notifications 10 PM - 8 AM', defaultChecked: true },
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
            <Eye className="w-4 h-4 text-accent" /> Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { title: 'Save Chat History', desc: 'Store conversation history for future reference', defaultChecked: true },
            { title: 'Analytics', desc: 'Help us improve by sharing anonymized usage data', defaultChecked: true },
            { title: 'Personalized Tips', desc: 'Receive personalized financial tips based on your usage', defaultChecked: true },
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
            <p className="text-sm font-medium text-foreground">Download My Data</p>
            <p className="text-xs text-muted-foreground mb-2">Export all your personal data (PDPB compliance)</p>
            <button className="text-xs text-accent hover:underline">Request Data Export</button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

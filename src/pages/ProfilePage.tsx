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

export default function ProfilePage() {
  const user = useAppStore((s) => s.user);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">My Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your personal information and preferences</p>
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
            <Button variant="outline" size="sm">Edit Photo</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Info */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-base flex items-center gap-2">
              <User className="w-4 h-4 text-accent" /> Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs">Full Name</Label>
              <Input defaultValue={user?.fullName} className="h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs flex items-center gap-1"><Mail className="w-3 h-3" /> Email</Label>
              <Input defaultValue={user?.email} className="h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs flex items-center gap-1"><Phone className="w-3 h-3" /> Phone</Label>
              <Input defaultValue={user?.phone} className="h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs flex items-center gap-1"><Calendar className="w-3 h-3" /> Date of Birth</Label>
              <Input type="date" defaultValue={user?.dob} className="h-10" />
            </div>
            <Button className="gradient-primary text-primary-foreground w-full">Save Changes</Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-base flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent" /> Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs">NPS Account (PRAN)</Label>
              <Input defaultValue={user?.npsAccountNumber} disabled className="h-10" />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label className="text-xs">Current Password</Label>
              <Input type="password" placeholder="Enter current password" className="h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">New Password</Label>
              <Input type="password" placeholder="Min. 12 characters" className="h-10" />
            </div>
            <Button variant="outline" className="w-full">Update Password</Button>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Two-Factor Auth</p>
                <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-base flex items-center gap-2">
              <Bell className="w-4 h-4 text-accent" /> Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {['Contribution Reminders', 'Tax Benefit Alerts', 'Withdrawal Updates', 'System Announcements'].map((item) => (
              <div key={item} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{item}</span>
                <Switch defaultChecked />
              </div>
            ))}
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Email Notifications</p>
                <p className="text-xs text-muted-foreground">Receive email updates</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">SMS Notifications</p>
                <p className="text-xs text-muted-foreground">Receive SMS updates</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-base flex items-center gap-2">
              <Globe className="w-4 h-4 text-accent" /> Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs">Language</Label>
              <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground">
                <option>English</option>
                <option>हिन्दी (Hindi)</option>
                <option>தமிழ் (Tamil)</option>
                <option>తెలుగు (Telugu)</option>
                <option>বাংলা (Bengali)</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Date Format</Label>
              <select className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground">
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
            <Separator />
            <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
              <p className="text-sm font-medium text-destructive">Danger Zone</p>
              <p className="text-xs text-muted-foreground mt-1">Permanently delete your account and all associated data.</p>
              <Button variant="outline" size="sm" className="mt-3 text-destructive border-destructive/30 hover:bg-destructive/10">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

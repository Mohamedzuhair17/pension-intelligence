import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Shield, Bell, Globe, Edit2, Check, X, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAppStore } from '@/store/useAppStore';
import { t } from '@/i18n/translations';
import { saveProfile } from '@/services/userProfileService';
import type { FundManagerOption, NpsTierPreference, RiskProfile } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

export default function ProfilePage() {
  const { user, setUser, language, addNotification } = useAppStore();
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [dob, setDob] = useState(user?.dob || '');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [language2fa, setLanguage2fa] = useState(true);
  const [notifications, setNotifications] = useState({
    contributions: true, taxBenefits: true, withdrawals: true,
    announcements: true, email: true, sms: false,
  });
  const [preferredLanguage, setPreferredLanguage] = useState(language);
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');

  const [isEditingFinancial, setIsEditingFinancial] = useState(false);
  const [annualIncome, setAnnualIncome] = useState(user?.annualIncome ?? 0);
  const [monthlyNps, setMonthlyNps] = useState(user?.monthlyNpsContribution ?? 0);
  const [contribInc, setContribInc] = useState(user?.annualContributionIncrease ?? 5);
  const [incGrowth, setIncGrowth] = useState(user?.incomeGrowthRate ?? 8);
  const [expReturn, setExpReturn] = useState(user?.expectedReturnRate ?? 10);
  const [tgtAge, setTgtAge] = useState(user?.targetRetirementAge ?? 60);
  const [tgtCorpus, setTgtCorpus] = useState(user?.targetCorpus ?? 0);
  const [risk, setRisk] = useState<RiskProfile>(user?.riskProfile ?? 'Moderate');
  const [annuityR, setAnnuityR] = useState(user?.annuityRate ?? 6);
  const [tierPref, setTierPref] = useState<NpsTierPreference>(user?.npsTierPreference ?? 'Tier I');
  const [fundPref, setFundPref] = useState<FundManagerOption>(user?.fundManagerPreference ?? 'SBI');

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setDob(user.dob || '');
      setAnnualIncome(user.annualIncome ?? 0);
      setMonthlyNps(user.monthlyNpsContribution ?? 0);
      setContribInc(user.annualContributionIncrease ?? 5);
      setIncGrowth(user.incomeGrowthRate ?? 8);
      setExpReturn(user.expectedReturnRate ?? 10);
      setTgtAge(user.targetRetirementAge ?? 60);
      setTgtCorpus(user.targetCorpus ?? 0);
      setRisk(user.riskProfile ?? 'Moderate');
      setAnnuityR(user.annuityRate ?? 6);
      setTierPref(user.npsTierPreference ?? 'Tier I');
      setFundPref(user.fundManagerPreference ?? 'SBI');
    }
  }, [user]);

  const handleSavePersonal = () => {
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      addNotification({ id: Date.now().toString(), title: 'Validation Error', message: 'All fields are required', type: 'info', read: false, timestamp: 'now' });
      return;
    }
    setUser({ ...user!, fullName, email, phone, dob });
    setIsEditingPersonal(false);
    addNotification({ id: Date.now().toString(), title: 'Profile Updated', message: 'Your personal information has been saved successfully', type: 'success', read: false, timestamp: 'now' });
  };

  const handleCancelPersonal = () => {
    setFullName(user?.fullName || ''); setEmail(user?.email || ''); setPhone(user?.phone || ''); setDob(user?.dob || '');
    setIsEditingPersonal(false);
  };

  const handleSaveFinancial = () => {
    if (!user) return;
    const tier: typeof user.tier =
      tierPref === 'Both' ? 'Both' : tierPref === 'Tier II' ? 'Tier II' : 'Tier I';
    const merged = saveProfile(user, {
      annualIncome,
      monthlyNpsContribution: monthlyNps,
      annualContributionIncrease: contribInc,
      incomeGrowthRate: incGrowth,
      expectedReturnRate: expReturn,
      targetRetirementAge: tgtAge,
      targetCorpus: tgtCorpus || undefined,
      riskProfile: risk,
      annuityRate: annuityR,
      npsTierPreference: tierPref,
      fundManagerPreference: fundPref,
      tier,
      npsData: user.npsData
        ? {
            ...user.npsData,
            retirementAge: tgtAge,
            fundManager: `${fundPref} Pension Funds`,
          }
        : user.npsData,
    });
    if (merged) {
      setUser(merged);
      setIsEditingFinancial(false);
      addNotification({
        id: Date.now().toString(),
        title: 'Profile Updated',
        message: 'Financial details saved. Insights will refresh.',
        type: 'success',
        read: false,
        timestamp: 'now',
      });
    }
  };

  const handleCancelFinancial = () => {
    if (!user) return;
    setAnnualIncome(user.annualIncome ?? 0);
    setMonthlyNps(user.monthlyNpsContribution ?? 0);
    setContribInc(user.annualContributionIncrease ?? 5);
    setIncGrowth(user.incomeGrowthRate ?? 8);
    setExpReturn(user.expectedReturnRate ?? 10);
    setTgtAge(user.targetRetirementAge ?? 60);
    setTgtCorpus(user.targetCorpus ?? 0);
    setRisk(user.riskProfile ?? 'Moderate');
    setAnnuityR(user.annuityRate ?? 6);
    setTierPref(user.npsTierPreference ?? 'Tier I');
    setFundPref(user.fundManagerPreference ?? 'SBI');
    setIsEditingFinancial(false);
  };

  const handleUpdatePassword = () => {
    setPasswordError('');
    if (!currentPassword || !newPassword || !confirmPassword) { setPasswordError('All fields are required'); return; }
    if (newPassword.length < 8) { setPasswordError('New password must be at least 8 characters'); return; }
    if (newPassword !== confirmPassword) { setPasswordError('Passwords do not match'); return; }
    setPasswordSuccess(true);
    setTimeout(() => {
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
      setShowPasswordForm(false); setPasswordSuccess(false);
      addNotification({ id: Date.now().toString(), title: 'Password Updated', message: 'Your password has been changed successfully', type: 'success', read: false, timestamp: 'now' });
    }, 1500);
  };

  if (!user) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl">
        <Card className="shadow-card" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px' }}>
          <CardContent className="p-6 text-center">
            <p className="text-[var(--text-secondary)]">Please log in to view your profile</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">{t('myProfile', language)}</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">{t('manageProfile', language)}</p>
      </div>

      {/* Profile Header */}
      <div className="rounded-2xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(59,130,246,0.1))', border: '1px solid rgba(124,58,237,0.15)' }}>
        <div className="floating-orb" style={{ width: 150, height: 150, background: '#7C3AED', top: -30, right: 20 }} />
        <div className="relative z-10 p-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center text-white font-display text-3xl font-bold"
              style={{ boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}>
              {fullName?.charAt(0) || 'U'}
            </div>
            <div className="flex-1">
              <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">{fullName}</h2>
              <p className="text-sm text-[var(--text-secondary)]">{email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="text-[10px] px-2 py-0.5 rounded-pill border-0" style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981' }}>{user?.accountStatus}</Badge>
                <Badge className="text-[10px] px-2 py-0.5 rounded-pill border-0" style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--text-secondary)' }}>{user?.subscriberType}</Badge>
                <Badge className="text-[10px] px-2 py-0.5 rounded-pill border-0" style={{ background: 'rgba(124,58,237,0.12)', color: '#9D5CF6' }}>{user?.tier}</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Info */}
        <Card className="shadow-card border-0" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px' }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-base flex items-center gap-2 text-[var(--text-primary)]">
              <User className="w-4 h-4 text-pp-purple" /> {t('personalInformation', language)}
            </CardTitle>
            {!isEditingPersonal && (
              <Button size="sm" variant="ghost" onClick={() => setIsEditingPersonal(true)} className="h-8 w-8 p-0 text-[var(--text-muted)] hover:text-pp-purple hover:bg-pp-purple-dim">
                <Edit2 className="w-4 h-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label className="text-xs text-[var(--text-secondary)]">{t('fullName', language)}</Label><Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-10" disabled={!isEditingPersonal} /></div>
            <div className="space-y-2"><Label className="text-xs text-[var(--text-secondary)] flex items-center gap-1"><Mail className="w-3 h-3" /> {t('email', language)}</Label><Input value={email} onChange={(e) => setEmail(e.target.value)} className="h-10" disabled={!isEditingPersonal} /></div>
            <div className="space-y-2"><Label className="text-xs text-[var(--text-secondary)] flex items-center gap-1"><Phone className="w-3 h-3" /> {t('phone', language)}</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} className="h-10" disabled={!isEditingPersonal} /></div>
            <div className="space-y-2"><Label className="text-xs text-[var(--text-secondary)] flex items-center gap-1"><Calendar className="w-3 h-3" /> {t('dateOfBirth', language)}</Label><Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="h-10" disabled={!isEditingPersonal} /></div>
            {isEditingPersonal && (
              <div className="flex gap-2">
                <button className="btn-gradient-purple flex-1 py-2.5 text-sm flex items-center justify-center gap-2 rounded-xl" onClick={handleSavePersonal}><Check className="w-4 h-4" /> {t('saveChanges', language)}</button>
                <Button variant="outline" className="flex-1 border-[rgba(255,255,255,0.08)] text-[var(--text-secondary)]" onClick={handleCancelPersonal}><X className="w-4 h-4 mr-2" /> {t('cancel', language)}</Button>
              </div>
            )}
            {!isEditingPersonal && <Button className="w-full gradient-primary text-white" disabled>{t('saveChanges', language)}</Button>}
          </CardContent>
        </Card>

        <Card className="shadow-card border-0 lg:col-span-2" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px' }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-base flex items-center gap-2 text-[var(--text-primary)]">
              <TrendingUp className="w-4 h-4 text-pp-purple" /> {t('financialRetirement', language)}
            </CardTitle>
            {!isEditingFinancial && (
              <Button size="sm" variant="ghost" onClick={() => setIsEditingFinancial(true)} className="h-8 w-8 p-0 text-[var(--text-muted)] hover:text-pp-purple hover:bg-pp-purple-dim">
                <Edit2 className="w-4 h-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs">{t('annualIncome', language)} (₹)</Label>
              <Input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} disabled={!isEditingFinancial} className="h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">{t('monthlyContribution', language)}</Label>
              <Input type="number" value={monthlyNps} onChange={(e) => setMonthlyNps(Number(e.target.value))} disabled={!isEditingFinancial} className="h-10" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <div className="flex justify-between text-xs">
                <span>{t('annualIncrease', language)}</span>
                <span className="font-mono">{contribInc}%</span>
              </div>
              <Slider value={[contribInc]} min={0} max={15} step={0.5} disabled={!isEditingFinancial} onValueChange={([v]) => setContribInc(v)} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <div className="flex justify-between text-xs">
                <span>{t('incomeGrowth', language)}</span>
                <span className="font-mono">{incGrowth}%</span>
              </div>
              <Slider value={[incGrowth]} min={0} max={15} step={0.5} disabled={!isEditingFinancial} onValueChange={([v]) => setIncGrowth(v)} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <div className="flex justify-between text-xs">
                <span>{t('expectedReturn', language)}</span>
                <span className="font-mono">{expReturn}%</span>
              </div>
              <Slider value={[expReturn]} min={4} max={14} step={0.5} disabled={!isEditingFinancial} onValueChange={([v]) => setExpReturn(v)} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">{t('retirementAge', language)}</Label>
              <Input type="number" value={tgtAge} onChange={(e) => setTgtAge(Number(e.target.value))} disabled={!isEditingFinancial} className="h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">{t('goalTargetCorpus', language)}</Label>
              <Input type="number" value={tgtCorpus} onChange={(e) => setTgtCorpus(Number(e.target.value))} disabled={!isEditingFinancial} className="h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">{t('riskProfile', language)}</Label>
              <Select value={risk} onValueChange={(v) => setRisk(v as RiskProfile)} disabled={!isEditingFinancial}>
                <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Conservative">Conservative</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">{t('annuityRate', language)}</Label>
              <Input type="number" step={0.1} min={4} max={8} value={annuityR} onChange={(e) => setAnnuityR(Number(e.target.value))} disabled={!isEditingFinancial} className="h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">NPS tier</Label>
              <Select value={tierPref} onValueChange={(v) => setTierPref(v as NpsTierPreference)} disabled={!isEditingFinancial}>
                <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tier I">Tier I</SelectItem>
                  <SelectItem value="Tier II">Tier II</SelectItem>
                  <SelectItem value="Both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">{t('fundManager', language)}</Label>
              <Select value={fundPref} onValueChange={(v) => setFundPref(v as FundManagerOption)} disabled={!isEditingFinancial}>
                <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(['SBI', 'HDFC', 'ICICI', 'Kotak', 'Axis', 'UTI', 'LIC'] as const).map((fm) => (
                    <SelectItem key={fm} value={fm}>{fm}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {isEditingFinancial && (
              <div className="flex gap-2 sm:col-span-2">
                <button type="button" className="btn-gradient-purple flex-1 py-2.5 text-sm flex items-center justify-center gap-2 rounded-xl" onClick={handleSaveFinancial}>
                  <Check className="w-4 h-4" /> {t('saveChanges', language)}
                </button>
                <Button type="button" variant="outline" className="flex-1 border-[rgba(255,255,255,0.08)]" onClick={handleCancelFinancial}>
                  <X className="w-4 h-4 mr-2" /> {t('cancel', language)}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="shadow-card border-0" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px' }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-base flex items-center gap-2 text-[var(--text-primary)]">
              <Shield className="w-4 h-4 text-pp-purple" /> {t('security', language)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label className="text-xs text-[var(--text-secondary)]">{t('npsAccount', language)}</Label><Input value={user?.npsAccountNumber} disabled className="h-10" /></div>
            <Separator className="bg-[rgba(255,255,255,0.06)]" />
            {!showPasswordForm ? (
              <Button variant="outline" className="w-full border-[rgba(255,255,255,0.08)] text-[var(--text-secondary)] hover:text-pp-purple hover:border-[rgba(124,58,237,0.3)]" onClick={() => setShowPasswordForm(true)}>{t('updatePassword', language)}</Button>
            ) : (
              <>
                {passwordError && (<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl flex items-start gap-3" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}><AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#EF4444' }} /><p className="text-sm" style={{ color: '#EF4444' }}>{passwordError}</p></motion.div>)}
                {passwordSuccess && (<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl flex items-start gap-3" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}><CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#10B981' }} /><p className="text-sm" style={{ color: '#10B981' }}>Password updated successfully!</p></motion.div>)}
                <div className="space-y-2"><Label className="text-xs text-[var(--text-secondary)]">{t('currentPassword', language)}</Label><Input type="password" placeholder={t('currentPassword', language)} value={currentPassword} onChange={(e) => { setCurrentPassword(e.target.value); setPasswordError(''); }} className="h-10" disabled={passwordSuccess} /></div>
                <div className="space-y-2"><Label className="text-xs text-[var(--text-secondary)]">{t('newPassword', language)}</Label><Input type="password" placeholder="Min. 8 characters" value={newPassword} onChange={(e) => { setNewPassword(e.target.value); setPasswordError(''); }} className="h-10" disabled={passwordSuccess} /></div>
                <div className="space-y-2"><Label className="text-xs text-[var(--text-secondary)]">Confirm New Password</Label><Input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); setPasswordError(''); }} className="h-10" disabled={passwordSuccess} /></div>
                <div className="flex gap-2">
                  <button className="btn-gradient-purple flex-1 py-2.5 text-sm flex items-center justify-center gap-2 rounded-xl disabled:opacity-50" onClick={handleUpdatePassword} disabled={passwordSuccess}><Check className="w-4 h-4" /> {t('updatePassword', language)}</button>
                  <Button variant="outline" className="flex-1 border-[rgba(255,255,255,0.08)] text-[var(--text-secondary)]" onClick={() => { setShowPasswordForm(false); setCurrentPassword(''); setNewPassword(''); setConfirmPassword(''); setPasswordError(''); }} disabled={passwordSuccess}><X className="w-4 h-4 mr-2" /> {t('cancel', language)}</Button>
                </div>
              </>
            )}
            <Separator className="bg-[rgba(255,255,255,0.06)]" />
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-[var(--text-primary)]">{t('twoFactorAuth', language)}</p><p className="text-xs text-[var(--text-secondary)]">{t('twoFactorDesc', language)}</p></div>
              <Switch checked={language2fa} onCheckedChange={setLanguage2fa} />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="shadow-card border-0" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px' }}>
          <CardHeader><CardTitle className="font-display text-base flex items-center gap-2 text-[var(--text-primary)]"><Bell className="w-4 h-4 text-pp-purple" /> {t('notificationSettings', language)}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: 'contributions', label: t('contributionReminders', language), checked: notifications.contributions },
              { key: 'taxBenefits', label: t('taxBenefitAlerts', language), checked: notifications.taxBenefits },
              { key: 'withdrawals', label: t('withdrawalUpdates', language), checked: notifications.withdrawals },
              { key: 'announcements', label: t('systemAnnouncements', language), checked: notifications.announcements },
            ].map((n) => (
              <div key={n.key} className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-primary)]">{n.label}</span>
                <Switch checked={n.checked} onCheckedChange={(v) => setNotifications({ ...notifications, [n.key]: v })} />
              </div>
            ))}
            <Separator className="bg-[rgba(255,255,255,0.06)]" />
            <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-[var(--text-primary)]">{t('emailNotifications', language)}</p><p className="text-xs text-[var(--text-secondary)]">{t('receiveEmailUpdates', language)}</p></div><Switch checked={notifications.email} onCheckedChange={(v) => setNotifications({ ...notifications, email: v })} /></div>
            <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-[var(--text-primary)]">{t('smsNotifications', language)}</p><p className="text-xs text-[var(--text-secondary)]">{t('receiveSmsUpdates', language)}</p></div><Switch checked={notifications.sms} onCheckedChange={(v) => setNotifications({ ...notifications, sms: v })} /></div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="shadow-card border-0" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px' }}>
          <CardHeader><CardTitle className="font-display text-base flex items-center gap-2 text-[var(--text-primary)]"><Globe className="w-4 h-4 text-pp-purple" /> {t('preferences', language)}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs text-[var(--text-secondary)]">{t('language', language)}</Label>
              <select value={preferredLanguage} onChange={(e) => setPreferredLanguage(e.target.value)}
                className="w-full h-10 rounded-xl px-3 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-pp-purple/30"
                style={{ background: 'var(--bg-card-alt, #141C2F)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <option value="en">English</option><option value="hi">हिन्दी (Hindi)</option><option value="ta">தமிழ் (Tamil)</option><option value="te">తెలుగు (Telugu)</option><option value="bn">বাংলা (Bengali)</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-[var(--text-secondary)]">{t('dateFormat', language)}</Label>
              <select value={dateFormat} onChange={(e) => setDateFormat(e.target.value)}
                className="w-full h-10 rounded-xl px-3 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-pp-purple/30"
                style={{ background: 'var(--bg-card-alt, #141C2F)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <option>DD/MM/YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option>
              </select>
            </div>
            <Separator className="bg-[rgba(255,255,255,0.06)]" />
            <div className="p-4 rounded-xl" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
              <p className="text-sm font-medium" style={{ color: '#EF4444' }}>{t('dangerZone', language)}</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">{t('deleteAccountDesc', language)}</p>
              <Button variant="outline" size="sm" className="mt-3 border-[rgba(239,68,68,0.3)] hover:bg-[rgba(239,68,68,0.08)]" style={{ color: '#EF4444' }}>{t('deleteAccount', language)}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

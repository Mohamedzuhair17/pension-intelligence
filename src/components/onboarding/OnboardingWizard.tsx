import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppStore } from '@/store/useAppStore';
import { calculateAgeFromDob } from '@/lib/age';
import { saveProfile, syncNpsDerivedData } from '@/services/userProfileService';
import type { FundManagerOption, NpsTierPreference, RiskProfile, User } from '@/types';

const STEPS = 5;

const riskCopy: Record<RiskProfile, { title: string; desc: string }> = {
  Conservative: {
    title: 'Conservative',
    desc: 'Prioritizes capital preservation with lower equity exposure.',
  },
  Moderate: {
    title: 'Moderate',
    desc: 'Balances growth and stability — common default for long-term NPS investors.',
  },
  Aggressive: {
    title: 'Aggressive',
    desc: 'Higher equity allocation for maximum long-term growth.',
  },
};

type Props = {
  /** When true, render as centered modal card (dashboard) instead of full-screen takeover */
  embedded?: boolean;
  onClose?: () => void;
  onCompleted?: () => void;
};

export default function OnboardingWizard({ embedded = false, onClose, onCompleted }: Props) {
  const navigate = useNavigate();
  const { user, setUser } = useAppStore();
  const [step, setStep] = useState(user?.onboardingStep ?? 0);

  const [ageInput, setAgeInput] = useState(user?.npsData?.age ?? 30);
  const [dob, setDob] = useState(user?.dob || '1995-06-15');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>(user?.gender || 'Male');

  const [annualIncome, setAnnualIncome] = useState(user?.annualIncome ?? 0);
  const [currentCorpus, setCurrentCorpus] = useState(user?.npsData?.totalCorpus ?? 0);
  const [monthlyContribution, setMonthlyContribution] = useState(user?.monthlyNpsContribution ?? 0);

  const [targetRetirementAge, setTargetRetirementAge] = useState(user?.targetRetirementAge ?? 60);
  const [expectedReturnRate, setExpectedReturnRate] = useState(user?.expectedReturnRate ?? 10);

  const [riskProfile, setRiskProfile] = useState<RiskProfile>(user?.riskProfile || 'Moderate');

  const [pran, setPran] = useState(user?.pran || '');
  const [tierPref, setTierPref] = useState<NpsTierPreference>(user?.npsTierPreference || 'Tier I');
  const [fundManager, setFundManager] = useState<FundManagerOption>(user?.fundManagerPreference || 'SBI');

  useEffect(() => {
    const fromDob = calculateAgeFromDob(dob);
    if (fromDob > 0) setAgeInput(fromDob);
  }, [dob]);

  if (!user) return null;

  const age = ageInput;

  const persistPartial = (nextStep: number, extra: Partial<User> = {}) => {
    const tier: User['tier'] =
      tierPref === 'Both' ? 'Both' : tierPref === 'Tier II' ? 'Tier II' : 'Tier I';
    const merged: Partial<User> = {
      ...extra,
      onboardingStep: nextStep,
      gender,
      annualIncome,
      monthlyNpsContribution: monthlyContribution,
      incomeGrowthRate: user.incomeGrowthRate ?? 8,
      annualContributionIncrease: user.annualContributionIncrease ?? 5,
      expectedReturnRate,
      targetRetirementAge,
      riskProfile,
      npsTierPreference: tierPref,
      fundManagerPreference: fundManager,
      tier,
      dob,
      npsData: {
        ...user.npsData!,
        totalCorpus: currentCorpus,
        age,
        retirementAge: targetRetirementAge,
        yearsToRetirement: Math.max(0, targetRetirementAge - age),
        fundManager: `${fundManager} Pension Funds`,
      },
    };
    const next = saveProfile(user, merged);
    if (next) setUser(next);
  };

  const buildCompleteUser = (): User => {
    const tier: User['tier'] =
      tierPref === 'Both' ? 'Both' : tierPref === 'Tier II' ? 'Tier II' : 'Tier I';
    return {
      ...user,
      fullName: user.fullName,
      dob,
      gender,
      annualIncome,
      monthlyNpsContribution: monthlyContribution,
      incomeGrowthRate: user.incomeGrowthRate ?? 8,
      annualContributionIncrease: user.annualContributionIncrease ?? 5,
      expectedReturnRate,
      targetRetirementAge,
      targetCorpus: user.targetCorpus ?? 5_00_00_000,
      riskProfile,
      pran: pran.replace(/\D/g, '').length >= 4 ? pran.replace(/\D/g, '') : undefined,
      npsTierPreference: tierPref,
      fundManagerPreference: fundManager,
      tier,
      annuityRate: user.annuityRate ?? 6,
      onboardingComplete: true,
      onboardingStep: STEPS,
      npsData: {
        ...user.npsData!,
        totalCorpus: currentCorpus,
        age,
        retirementAge: targetRetirementAge,
        yearsToRetirement: Math.max(0, targetRetirementAge - age),
        fundManager: `${fundManager} Pension Funds`,
      },
    };
  };

  const canNext = (): boolean => {
    if (step === 0) return ageInput >= 18 && ageInput <= 80 && dob.length > 0;
    if (step === 1) return annualIncome > 0 && monthlyContribution >= 0;
    if (step === 2) return targetRetirementAge > age && expectedReturnRate > 0;
    if (step === 3) return true;
    return true;
  };

  const handleNext = () => {
    if (!canNext()) return;
    if (step < STEPS - 1) {
      persistPartial(step + 1);
      setStep((s) => s + 1);
    } else handleFinish();
  };

  const handleFinish = () => {
    setUser(syncNpsDerivedData(buildCompleteUser()));
    onCompleted?.();
    if (embedded) onClose?.();
    else navigate('/dashboard', { replace: true });
  };

  const handleSkipOptional = () => {
    handleFinish();
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
      persistPartial(Math.max(0, step - 1));
    }
  };

  const shellClass = embedded
    ? 'fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm'
    : 'fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4';

  const shellBg = embedded ? '' : 'linear-gradient(165deg, #0a0f1a 0%, #0d1120 45%, rgba(124,58,237,0.12) 100%)';

  return (
    <div className={shellClass} style={embedded ? undefined : { background: shellBg }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full ${embedded ? 'max-w-lg' : 'max-w-lg'}`}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-display text-sm font-semibold text-[var(--text-primary)]">Set up your profile</p>
              <p className="text-xs text-[var(--text-muted)]">
                Step {step + 1} of {STEPS}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-24 rounded-full bg-[rgba(255,255,255,0.06)]">
              <div
                className="h-full rounded-full bg-pp-purple transition-all"
                style={{ width: `${((step + 1) / STEPS) * 100}%` }}
              />
            </div>
            {embedded && onClose && (
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <Card className="border-0 shadow-card" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <CardHeader>
            <CardTitle className="font-display text-lg text-[var(--text-primary)]">
              {step === 0 && 'About you'}
              {step === 1 && 'Income & NPS'}
              {step === 2 && 'Retirement targets'}
              {step === 3 && 'Risk profile'}
              {step === 4 && 'NPS details (optional)'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 0 && (
              <>
                <div className="space-y-2">
                  <Label className="text-xs">Date of birth</Label>
                  <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Age (years)</Label>
                  <Input
                    type="number"
                    min={18}
                    max={100}
                    value={ageInput}
                    onChange={(e) => setAgeInput(Number(e.target.value))}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Gender</Label>
                  <Select value={gender} onValueChange={(v) => setGender(v as typeof gender)}>
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label className="text-xs">Annual income (₹)</Label>
                  <Input
                    type="number"
                    min={0}
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(Number(e.target.value))}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Current NPS corpus (₹)</Label>
                  <Input
                    type="number"
                    min={0}
                    value={currentCorpus}
                    onChange={(e) => setCurrentCorpus(Number(e.target.value))}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Monthly NPS contribution (₹)</Label>
                  <Input
                    type="number"
                    min={0}
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="h-10"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-xs">Target retirement age</Label>
                    <span className="text-xs font-mono text-[var(--text-primary)]">{targetRetirementAge}</span>
                  </div>
                  <Slider
                    value={[targetRetirementAge]}
                    min={45}
                    max={70}
                    step={1}
                    onValueChange={([v]) => setTargetRetirementAge(v)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-xs">Expected annual return (%)</Label>
                    <span className="text-xs font-mono text-[var(--text-primary)]">{expectedReturnRate}%</span>
                  </div>
                  <Slider
                    value={[expectedReturnRate]}
                    min={4}
                    max={14}
                    step={0.5}
                    onValueChange={([v]) => setExpectedReturnRate(v)}
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <div className="grid gap-3">
                {(['Conservative', 'Moderate', 'Aggressive'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRiskProfile(r)}
                    className={`rounded-xl border p-3 text-left transition-colors ${
                      riskProfile === r
                        ? 'border-pp-purple bg-[rgba(124,58,237,0.12)]'
                        : 'border-[rgba(255,255,255,0.08)] hover:border-[rgba(124,58,237,0.35)]'
                    }`}
                  >
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{riskCopy[r].title}</p>
                    <p className="mt-1 text-xs text-[var(--text-secondary)]">{riskCopy[r].desc}</p>
                  </button>
                ))}
              </div>
            )}

            {step === 4 && (
              <>
                <div className="space-y-2">
                  <Label className="text-xs">PRAN (optional)</Label>
                  <Input
                    inputMode="numeric"
                    value={pran}
                    onChange={(e) => setPran(e.target.value.replace(/\D/g, '').slice(0, 12))}
                    className="h-10 font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">NPS tier</Label>
                  <Select value={tierPref} onValueChange={(v) => setTierPref(v as NpsTierPreference)}>
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tier I">Tier I</SelectItem>
                      <SelectItem value="Tier II">Tier II</SelectItem>
                      <SelectItem value="Both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Fund manager preference</Label>
                  <Select value={fundManager} onValueChange={(v) => setFundManager(v as FundManagerOption)}>
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(['SBI', 'HDFC', 'ICICI', 'Kotak', 'Axis', 'UTI', 'LIC'] as const).map((fm) => (
                        <SelectItem key={fm} value={fm}>
                          {fm}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="ghost" className="w-full text-[var(--text-muted)]" onClick={handleSkipOptional}>
                  Skip this step
                </Button>
              </>
            )}

            <div className="flex gap-2 pt-2">
              {step > 0 && (
                <Button type="button" variant="outline" className="flex-1" onClick={handleBack}>
                  <ChevronLeft className="mr-1 h-4 w-4" /> Back
                </Button>
              )}
              <Button type="button" className="flex-1 btn-gradient-purple" disabled={!canNext()} onClick={handleNext}>
                {step === STEPS - 1 ? 'Finish' : 'Next'}
                {step < STEPS - 1 && <ChevronRight className="ml-1 h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

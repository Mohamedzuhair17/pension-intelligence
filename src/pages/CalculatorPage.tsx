import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Calculator as CalcIcon,
  Download,
  RotateCcw,
  Share2,
  Target,
  Calendar,
  Banknote,
  BarChart3,
} from 'lucide-react';
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { t } from '@/i18n/translations';
import { useAppStore } from '@/store/useAppStore';
import type { CalculatorInput, WithdrawalMode, YearlyProjection } from '@/types';
import {
  calculatePension,
  calculateRequiredSIP,
  enrichWithPension,
  yearByYearSimulation,
} from '@/lib/financialEngine';
import { formatINR, formatINRCompact } from '@/lib/formatCurrency';

const COLORS = ['#7C3AED', '#3B82F6', '#14B8A6', '#F59E0B'];

const staticDefaults: CalculatorInput = {
  age: 30,
  retirementAge: 60,
  currentIncome: 800000,
  incomeGrowth: 8,
  inflationRate: 6,
  monthlyContribution: 5000,
  contributionIncrease: 5,
  equityAllocation: 50,
  corporateBondAllocation: 30,
  govSecAllocation: 20,
  expectedReturn: 10,
  currentBalance: 0,
  annuityRate: 6,
  withdrawalMode: 'normal',
};

function buildDefaultsFromProfile(): CalculatorInput {
  const u = useAppStore.getState().user;
  if (!u?.npsData) return { ...staticDefaults };
  return {
    age: Math.min(55, Math.max(18, u.npsData.age)),
    retirementAge: u.targetRetirementAge ?? u.npsData.retirementAge,
    currentIncome: u.annualIncome ?? 800000,
    incomeGrowth: u.incomeGrowthRate ?? 8,
    inflationRate: 6,
    monthlyContribution: u.monthlyNpsContribution ?? 5000,
    contributionIncrease: u.annualContributionIncrease ?? 5,
    equityAllocation: 50,
    corporateBondAllocation: 30,
    govSecAllocation: 20,
    expectedReturn: u.expectedReturnRate ?? 10,
    currentBalance: u.npsData.totalCorpus,
    annuityRate: Math.min(8, Math.max(4, u.annuityRate ?? 6)),
    withdrawalMode: 'normal',
  };
}

function parseInputNumber(value: string, fallback = 0) {
  if (value.trim() === '') return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function calculatorToSimulationInput(c: CalculatorInput) {
  const ig = c.incomeGrowth / 100;
  const ci = c.contributionIncrease / 100;
  const combinedAnnual = ((1 + ig) * (1 + ci) - 1) * 100;
  return {
    age: c.age,
    retirementAge: c.retirementAge,
    currentCorpus: c.currentBalance,
    monthlyContribution: c.monthlyContribution,
    incomeGrowthRatePercent: combinedAnnual,
    expectedReturnAnnualPercent: c.expectedReturn,
  };
}

export default function CalculatorPage() {
  const [inputs, setInputs] = useState<CalculatorInput>(staticDefaults);
  const language = useAppStore((s) => s.language);

  const [goalTarget, setGoalTarget] = useState(5_00_00_000);
  const [goalRetirementAge, setGoalRetirementAge] = useState(60);
  const [goalReturn, setGoalReturn] = useState(10);
  const [goalCorpus, setGoalCorpus] = useState(0);
  const [goalCurrentAge, setGoalCurrentAge] = useState(30);

  const update = (key: keyof CalculatorInput, value: number | WithdrawalMode) => {
    setInputs((prev) => {
      const updated = { ...prev, [key]: value } as CalculatorInput;
      if (typeof value === 'number' && key !== 'withdrawalMode') {
        if (updated.retirementAge <= updated.age) updated.retirementAge = updated.age + 1;
        if (updated.age >= updated.retirementAge) updated.age = Math.max(18, updated.retirementAge - 1);
      }
      return updated;
    });
  };

  const results = useMemo(() => {
    const sim = yearByYearSimulation(calculatorToSimulationInput(inputs));
    const withPension = enrichWithPension(sim, inputs.annuityRate, inputs.withdrawalMode);
    const pension = calculatePension(withPension.projectedCorpus, inputs.annuityRate, inputs.withdrawalMode);
    const yearlyProjections: YearlyProjection[] = sim.yearlyBreakdown.map((row) => ({
      age: row.age,
      year: row.year,
      contribution: row.contribution,
      returns: row.returns,
      corpus: row.corpus,
      taxBenefit: row.taxBenefit,
    }));
    return {
      projectedCorpus: withPension.projectedCorpus,
      monthlyPension: pension.monthlyPension,
      lumpSum: pension.lumpSum,
      totalContributions: withPension.totalContributions,
      totalReturns: withPension.totalReturns,
      annuityAmount: pension.annuityAmount,
      yearlyProjections,
    };
  }, [inputs]);

  const goalSip = useMemo(
    () =>
      calculateRequiredSIP({
        targetCorpus: goalTarget,
        targetAge: goalRetirementAge,
        currentAge: goalCurrentAge,
        currentCorpus: goalCorpus,
        expectedReturnAnnualPercent: goalReturn,
      }),
    [goalTarget, goalRetirementAge, goalCurrentAge, goalCorpus, goalReturn]
  );

  const goalFvExisting = useMemo(() => {
    const years = Math.max(0, goalRetirementAge - goalCurrentAge);
    const n = years * 12;
    const r = goalReturn / 100 / 12;
    if (n <= 0) return goalCorpus;
    return goalCorpus * Math.pow(1 + r, n);
  }, [goalCorpus, goalCurrentAge, goalRetirementAge, goalReturn]);

  const additionalVsCalculator =
    inputs.monthlyContribution > 0 ? Math.max(0, goalSip - inputs.monthlyContribution) : goalSip;

  const allocationTotal = inputs.equityAllocation + inputs.corporateBondAllocation + inputs.govSecAllocation;
  const allocationData = [
    { name: t('equity', language), value: inputs.equityAllocation },
    { name: t('corporateBonds', language), value: inputs.corporateBondAllocation },
    { name: t('govSecurities', language), value: inputs.govSecAllocation },
  ];

  const resultMetrics = [
    {
      label: t('projectedCorpus', language),
      value: formatINRCompact(results.projectedCorpus),
      icon: Target,
      color: '#10B981',
      bg: 'rgba(16,185,129,0.12)',
    },
    {
      label: t('monthlyPension', language),
      value: formatINR(results.monthlyPension),
      icon: Calendar,
      color: '#7C3AED',
      bg: 'rgba(124,58,237,0.12)',
    },
    {
      label: t('lumpSum', language),
      value: formatINR(results.lumpSum),
      icon: Banknote,
      color: '#3B82F6',
      bg: 'rgba(59,130,246,0.12)',
    },
    {
      label: t('totalContributions', language),
      value: formatINRCompact(results.totalContributions),
      icon: BarChart3,
      color: '#14B8A6',
      bg: 'rgba(20,184,166,0.12)',
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 font-display text-2xl font-bold text-[var(--text-primary)]">
            <CalcIcon className="h-6 w-6 text-pp-purple" /> {t('pensionCalculator', language)}
          </h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{t('estimateCorpus', language)}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInputs(buildDefaultsFromProfile())}
            className="border-[rgba(255,255,255,0.08)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[rgba(124,58,237,0.3)] hover:bg-[rgba(124,58,237,0.06)]"
          >
            <RotateCcw className="mr-1 h-4 w-4" /> {t('reset', language)}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-[rgba(255,255,255,0.08)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[rgba(124,58,237,0.3)] hover:bg-[rgba(124,58,237,0.06)]"
          >
            <Download className="mr-1 h-4 w-4" /> {t('pdf', language)}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-[rgba(255,255,255,0.08)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[rgba(124,58,237,0.3)] hover:bg-[rgba(124,58,237,0.06)]"
          >
            <Share2 className="mr-1 h-4 w-4" /> {t('share', language)}
          </Button>
        </div>
      </div>

      <Card
        className="shadow-card border-0"
        style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px' }}
      >
        <CardHeader className="pb-2">
          <CardTitle className="font-display text-base text-[var(--text-primary)]">{t('goalPlanner', language)}</CardTitle>
          <p className="text-xs text-[var(--text-muted)]">{t('goalPlannerDesc', language)}</p>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label className="text-xs">{t('goalTargetCorpus', language)}</Label>
            <Input type="number" value={goalTarget} onChange={(e) => setGoalTarget(parseInputNumber(e.target.value))} className="h-9" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">{t('goalRetirementAge', language)}</Label>
            <Input
              type="number"
              value={goalRetirementAge}
              onChange={(e) => setGoalRetirementAge(parseInputNumber(e.target.value, 60))}
              className="h-9"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">{t('goalExpectedReturn', language)}</Label>
            <Input type="number" step={0.5} value={goalReturn} onChange={(e) => setGoalReturn(parseInputNumber(e.target.value, 10))} className="h-9" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">{t('goalCurrentCorpus', language)}</Label>
            <Input type="number" value={goalCorpus} onChange={(e) => setGoalCorpus(parseInputNumber(e.target.value))} className="h-9" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">{t('goalCurrentAge', language)}</Label>
            <Input type="number" value={goalCurrentAge} onChange={(e) => setGoalCurrentAge(parseInputNumber(e.target.value, 30))} className="h-9" />
          </div>
          <div className="md:col-span-2 lg:col-span-3 rounded-xl p-4 space-y-2" style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.15)' }}>
            <p className="text-sm text-[var(--text-primary)]">
              {t('goalPlannerResult', language)
                .replace('{target}', formatINRCompact(goalTarget))
                .replace('{age}', String(goalRetirementAge))
                .replace('{sip}', formatINR(Math.round(goalSip)))
                .replace('{ret}', String(goalReturn))}
            </p>
            <p className="text-xs text-[var(--text-secondary)]">
              {t('goalFvExisting', language).replace('{fv}', formatINRCompact(Math.round(goalFvExisting)))}
            </p>
            <p className="text-xs text-[var(--text-secondary)]">
              {t('goalAdditionalSip', language).replace('{add}', formatINR(Math.round(additionalVsCalculator)))}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          <Card className="shadow-card border-0" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px' }}>
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-sm text-[var(--text-primary)]">{t('personalDetails', language)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <SliderField label={t('currentAge', language)} value={inputs.age} min={18} max={55} suffix=" years" onChange={(v) => update('age', v)} />
              <SliderField
                label={t('retirementAge', language)}
                value={inputs.retirementAge}
                min={45}
                max={75}
                suffix=" years"
                onChange={(v) => update('retirementAge', v)}
              />
              <div className="space-y-2">
                <Label className="text-xs text-[var(--text-secondary)]">{t('annualIncome', language)}</Label>
                <Input type="number" value={inputs.currentIncome} onChange={(e) => update('currentIncome', parseInputNumber(e.target.value))} className="h-9" />
              </div>
              <SliderField label={t('incomeGrowth', language)} value={inputs.incomeGrowth} min={0} max={15} suffix="%" step={0.5} onChange={(v) => update('incomeGrowth', v)} />
            </CardContent>
          </Card>

          <Card className="shadow-card border-0" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px' }}>
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-sm text-[var(--text-primary)]">{t('npsContribution', language)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label className="text-xs text-[var(--text-secondary)]">{t('monthlyContribution', language)}</Label>
                <Input
                  type="number"
                  value={inputs.monthlyContribution}
                  onChange={(e) => update('monthlyContribution', parseInputNumber(e.target.value))}
                  className="h-9"
                />
              </div>
              <SliderField label={t('annualIncrease', language)} value={inputs.contributionIncrease} min={0} max={15} suffix="%" step={0.5} onChange={(v) => update('contributionIncrease', v)} />
              <SliderField label={t('expectedReturn', language)} value={inputs.expectedReturn} min={4} max={14} suffix="%" step={0.5} onChange={(v) => update('expectedReturn', v)} />
              <div className="space-y-2">
                <Label className="text-xs text-[var(--text-secondary)]">{t('currentNpsBalance', language)}</Label>
                <Input type="number" value={inputs.currentBalance} onChange={(e) => update('currentBalance', parseInputNumber(e.target.value))} className="h-9" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px' }}>
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-sm text-[var(--text-primary)]">{t('npsWithdrawalRules', language)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-[var(--text-primary)]">{t('prematureExit', language)}</p>
                  <p className="text-xs text-[var(--text-muted)]">{t('prematureExitDesc', language)}</p>
                </div>
                <Switch
                  checked={inputs.withdrawalMode === 'premature'}
                  onCheckedChange={(c) => update('withdrawalMode', c ? 'premature' : 'normal')}
                />
              </div>
              <SliderField label={t('annuityRate', language)} value={inputs.annuityRate} min={4} max={8} suffix="%" step={0.1} onChange={(v) => update('annuityRate', v)} />
              <p className="text-xs text-[var(--text-muted)]">{t('annuityTaxNote', language)}</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px' }}>
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-sm text-[var(--text-primary)]">{t('assetAllocation', language)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <SliderField label={t('equity', language)} value={inputs.equityAllocation} min={0} max={75} suffix="%" onChange={(v) => update('equityAllocation', v)} />
              <SliderField label={t('corporateBonds', language)} value={inputs.corporateBondAllocation} min={0} max={100} suffix="%" onChange={(v) => update('corporateBondAllocation', v)} />
              <SliderField label={t('govSecurities', language)} value={inputs.govSecAllocation} min={0} max={100} suffix="%" onChange={(v) => update('govSecAllocation', v)} />
              {allocationTotal !== 100 && (
                <div
                  className="rounded-xl px-3 py-2 text-xs flex items-start gap-2"
                  style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', color: '#F59E0B' }}
                >
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                  <p>Asset allocation should total 100%. Current total: {allocationTotal}%.</p>
                </div>
              )}
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={allocationData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={2} stroke="none">
                      {allocationData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 lg:col-span-3">
          <div className="grid grid-cols-2 gap-3">
            {resultMetrics.map((m) => (
              <div key={m.label} className="rounded-2xl p-5 gradient-border" style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: m.bg }}>
                    <m.icon className="w-4 h-4" style={{ color: m.color }} />
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)]">{m.label}</p>
                </div>
                <p className="font-mono text-2xl lg:text-3xl font-bold text-[var(--text-primary)] tracking-tight">{m.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl p-4" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-[11px] text-[var(--text-muted)] mb-1">{t('totalReturns', language)}</p>
              <p className="font-mono text-lg font-bold text-pp-success">{formatINR(results.totalReturns)}</p>
            </div>
            <div className="rounded-2xl p-4" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-[11px] text-[var(--text-muted)] mb-1">{t('yearsToRetire', language)}</p>
              <p className="font-mono text-lg font-bold text-pp-blue">{inputs.retirementAge - inputs.age} yrs</p>
            </div>
          </div>

          <div className="rounded-2xl p-4" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-[11px] text-[var(--text-muted)] mb-1">{t('annuityPool', language)}</p>
            <p className="font-mono text-lg font-bold text-[var(--text-primary)]">{formatINR(results.annuityAmount)}</p>
          </div>

          <Card className="shadow-card border-0" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px' }}>
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-sm text-[var(--text-primary)]">{t('corpusGrowthOverTime', language)}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={results.yearlyProjections}>
                  <defs>
                    <linearGradient id="corpusGradCalc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis
                    dataKey="age"
                    tick={{ fontSize: 11, fill: '#475569', fontFamily: 'JetBrains Mono' }}
                    stroke="transparent"
                    label={{ value: t('age', language), position: 'insideBottom', offset: -5, fontSize: 11, fill: '#475569' }}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#475569', fontFamily: 'JetBrains Mono' }}
                    stroke="transparent"
                    tickFormatter={(v: number) => formatINRCompact(v)}
                  />
                  <Tooltip formatter={(v: number) => formatINR(v)} />
                  <Area
                    type="monotone"
                    dataKey="corpus"
                    stroke="#7C3AED"
                    fill="url(#corpusGradCalc)"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5, fill: '#9D5CF6', stroke: '#0D1120', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px' }}>
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-sm text-[var(--text-primary)]">{t('yearWiseProjection', language)}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-64 overflow-x-auto overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="sticky top-0" style={{ background: 'var(--bg-card)' }}>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <th className="p-2 text-left font-medium text-[var(--text-muted)]">{t('age', language)}</th>
                      <th className="p-2 text-right font-medium text-[var(--text-muted)]">{t('contribution', language)}</th>
                      <th className="p-2 text-right font-medium text-[var(--text-muted)]">{t('returns', language)}</th>
                      <th className="p-2 text-right font-medium text-[var(--text-muted)]">{t('corpus', language)}</th>
                      <th className="p-2 text-right font-medium text-[var(--text-muted)]">{t('taxBenefit', language)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.yearlyProjections.map((row, idx) => (
                      <tr
                        key={row.age}
                        style={{
                          borderBottom: '1px solid rgba(255,255,255,0.03)',
                          background: idx % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(124,58,237,0.04)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = idx % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent';
                        }}
                      >
                        <td className="p-2 font-medium font-mono text-[var(--text-primary)]">{row.age}</td>
                        <td className="p-2 text-right font-mono text-[var(--text-primary)]">{formatINR(row.contribution)}</td>
                        <td className="p-2 text-right font-mono text-pp-success">{formatINR(row.returns)}</td>
                        <td className="p-2 text-right font-mono font-medium text-[var(--text-primary)]">{formatINR(row.corpus)}</td>
                        <td className="p-2 text-right font-mono text-pp-purple">{formatINR(row.taxBenefit)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  suffix,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-xs text-[var(--text-secondary)]">{label}</Label>
        <span className="text-xs font-semibold font-mono text-[var(--text-primary)]">
          {value}
          {suffix}
        </span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={([v]) => onChange(v)} />
    </div>
  );
}

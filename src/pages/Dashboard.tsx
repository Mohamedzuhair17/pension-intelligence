import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MessageSquare, Calculator, FileText, Download, TrendingUp,
  IndianRupee, ArrowUpRight, Clock, Wallet, PiggyBank, Sparkles,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/useAppStore';
import { t } from '@/i18n/translations';
import { profileToSimulationInput } from '@/services/userProfileService';
import {
  buildCorpusProjectionChartSeries,
  calculateRequiredSIP,
  projectCorpusAtAge,
  simulateCorpus,
  yearByYearSimulation,
} from '@/lib/financialEngine';
import { formatINR, formatINRCompact } from '@/lib/formatCurrency';
import type { RiskProfile, User } from '@/types';
import OnboardingWizard from '@/components/onboarding/OnboardingWizard';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
  ReferenceDot,
} from 'recharts';

const GOAL_5CR = 5_00_00_000;

function hasProfileData(user: User): boolean {
  return (
    (user.npsData?.age ?? 0) > 0 &&
    user.targetRetirementAge != null &&
    user.expectedReturnRate != null &&
    user.monthlyNpsContribution != null
  );
}

function allocationFor(age: number, risk: RiskProfile | undefined) {
  if (age < 40) {
    if (risk === 'Aggressive') return { eq: 75, corp: 15, gov: 10 };
    if (risk === 'Moderate') return { eq: 50, corp: 30, gov: 20 };
    return { eq: 25, corp: 45, gov: 30 };
  }
  if (age <= 50) {
    if (risk === 'Aggressive') return { eq: 60, corp: 25, gov: 15 };
    if (risk === 'Moderate') return { eq: 40, corp: 35, gov: 25 };
    return { eq: 25, corp: 45, gov: 30 };
  }
  return { eq: 25, corp: 45, gov: 30 };
}

function SemiGauge({ pct, label }: { pct: number; label: string }) {
  const p = Math.min(100, Math.max(0, pct));
  const r = 52;
  const c = Math.PI * r;
  const dash = c * (p / 100);

  return (
    <div className="relative mx-auto flex h-32 w-44 flex-col items-center justify-end">
      <svg className="absolute top-0" width="176" height="88" viewBox="0 0 176 88">
        <path
          d="M 12 88 A 76 76 0 0 1 164 88"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M 12 88 A 76 76 0 0 1 164 88"
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
        />
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative z-10 mt-10 text-center">
        <p className="font-display text-xl font-bold text-[var(--text-primary)]">{Math.round(p)}%</p>
        <p className="text-[10px] text-[var(--text-muted)]">{label}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const user = useAppStore((s) => s.user);
  const language = useAppStore((s) => s.language);

  const needsOnboarding = Boolean(user && user.onboardingComplete !== true);
  const [wizardOpen, setWizardOpen] = useState(needsOnboarding);

  useEffect(() => {
    if (needsOnboarding) setWizardOpen(true);
  }, [needsOnboarding, user?.id]);

  const hasData = Boolean(user && hasProfileData(user));

  const simInput = useMemo(() => (user ? profileToSimulationInput(user) : null), [user]);

  const financial = useMemo(() => {
    if (!simInput) return null;
    return yearByYearSimulation(simInput);
  }, [simInput]);

  const simSpec = useMemo(() => {
    if (!user?.npsData) return null;
    return simulateCorpus({
      age: user.npsData.age,
      retirement_age: user.targetRetirementAge ?? user.npsData.retirementAge,
      current_corpus: user.npsData.totalCorpus,
      monthly_contribution: user.monthlyNpsContribution ?? 0,
      expected_return_rate: user.expectedReturnRate ?? 10,
      income_growth_rate: user.incomeGrowthRate ?? 8,
    });
  }, [user]);

  const chartSeries = useMemo(() => {
    if (!simInput) return [];
    return buildCorpusProjectionChartSeries(simInput, 75);
  }, [simInput]);

  const age = user?.npsData?.age ?? 0;
  const retirementAge = user?.targetRetirementAge ?? user?.npsData?.retirementAge ?? 60;
  const monthly = user?.monthlyNpsContribution ?? 0;
  const currentCorpus = user?.npsData?.totalCorpus ?? 0;
  const targetCorpus = user?.targetCorpus ?? GOAL_5CR;
  const returnRate = user?.expectedReturnRate ?? 10;

  const recommendedSip = useMemo(() => {
    if (!user?.npsData || !simInput) return 0;
    return calculateRequiredSIP({
      targetCorpus: GOAL_5CR,
      targetAge: retirementAge,
      currentAge: age,
      currentCorpus,
      expectedReturnAnnualPercent: returnRate,
    });
  }, [user, simInput, age, retirementAge, currentCorpus, returnRate]);

  const sipFor55 = useMemo(() => {
    if (!simInput || !financial) return 0;
    if (55 <= age) return 0;
    return calculateRequiredSIP({
      targetCorpus: financial.projectedCorpus,
      targetAge: 55,
      currentAge: age,
      currentCorpus,
      expectedReturnAnnualPercent: returnRate,
    });
  }, [simInput, financial, age, currentCorpus, returnRate]);

  const sipAtRecommended = useMemo(() => {
    if (!simInput) return null;
    const alt = yearByYearSimulation({
      ...simInput,
      monthlyContribution: recommendedSip > 0 ? recommendedSip : monthly,
    });
    return alt.projectedCorpus;
  }, [simInput, recommendedSip, monthly]);

  const goalPct = targetCorpus > 0 ? Math.min(100, (currentCorpus / targetCorpus) * 100) : 0;
  /** Positive = shortfall vs goal; negative = projected ahead of goal. */
  const corpusGap = targetCorpus - (financial?.projectedCorpus ?? 0);

  const milestones = useMemo(() => {
    if (!simInput || !user) return [];
    const ra = retirementAge;
    const anchors = [30, 40, 50, ra].filter((a) => a >= age);
    const sorted = [...new Set([age, ...anchors])].sort((a, b) => a - b).slice(0, 5);
    return sorted.map((a) => {
      const c = projectCorpusAtAge(simInput, a);
      const note =
        a === age
          ? `SIP ${formatINRCompact(monthly)}/mo`
          : a === 40
            ? t('milestoneRebalance', language)
            : a === 50
              ? t('milestoneConservative', language)
              : a === ra
                ? `${t('estMonthlyPension', language)} ${financial ? formatINRCompact((financial.projectedCorpus * 0.4 * 0.06) / 12) : '—'}`
                : '';
      return { age: a, corpus: c, note };
    });
  }, [simInput, user, age, retirementAge, monthly, financial, language]);

  const alloc = allocationFor(age, user?.riskProfile);

  const annualTaxSavedEst = (user?.annualIncome ?? 0) > 10_00_000 ? 15000 : 5000;
  const totalTaxSavedEst = annualTaxSavedEst * (financial?.yearsRemaining ?? 0);

  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

  const quickActions = [
    { label: t('askAIAssistant', language), icon: MessageSquare, path: '/assistant', color: 'bg-pp-purple-dim text-pp-purple-light' },
    { label: t('calculatePension', language), icon: Calculator, path: '/calculator', color: 'bg-pp-blue-dim text-pp-blue-light' },
    { label: t('taxDocuments', language), icon: Download, path: '/documents', color: 'bg-pp-teal-dim text-pp-teal-light' },
    { label: t('accountStatement', language), icon: FileText, path: '/documents', color: 'bg-amber-light text-amber' },
  ];

  const recentChats = [
    { title: 'Tax benefits under NPS', time: '2 hours ago', snippet: 'Section 80CCD...', dotColor: '#7C3AED' },
    { title: 'Withdrawal rules', time: 'Yesterday', snippet: 'Tier I rules...', dotColor: '#3B82F6' },
    { title: 'Fund allocation', time: '3 days ago', snippet: 'Balanced mix...', dotColor: '#14B8A6' },
  ];

  const display = (v: number | undefined, fmt: (n: number) => string) =>
    hasData && v !== undefined && Number.isFinite(v) ? fmt(v) : '—';

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.04 } } }}
      className="max-w-7xl space-y-6"
    >
      {needsOnboarding && wizardOpen && (
        <OnboardingWizard embedded onClose={() => setWizardOpen(false)} onCompleted={() => setWizardOpen(false)} />
      )}

      {needsOnboarding && !wizardOpen && (
        <motion.div variants={item} className="rounded-xl border border-[rgba(59,130,246,0.25)] bg-[rgba(59,130,246,0.08)] p-4">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-[var(--text-primary)]">{t('onboardingBannerContinue', language)}</p>
            <Button size="sm" className="btn-gradient-purple" onClick={() => setWizardOpen(true)}>
              {t('continueSetup', language)}
            </Button>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]">
            <div
              className="h-full rounded-full bg-pp-blue transition-all"
              style={{ width: `${(((user?.onboardingStep ?? 0) + 1) / 5) * 100}%` }}
            />
          </div>
          <p className="mt-1 text-[10px] text-[var(--text-muted)]">
            {t('stepProgress', language)
              .replace('{n}', String((user?.onboardingStep ?? 0) + 1))
              .replace('{t}', '5')}
          </p>
        </motion.div>
      )}

      <motion.div variants={item}>
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(59,130,246,0.12), rgba(20,184,166,0.08))',
            border: '1px solid rgba(124,58,237,0.15)',
          }}
        >
          <div className="floating-orb" style={{ width: 200, height: 200, background: '#7C3AED', top: -40, right: -20 }} />
          <div className="relative z-10 flex flex-col justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                <Badge className="rounded-pill border-0 px-2 py-0.5 text-[10px]" style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981' }}>
                  {user?.accountStatus || 'Active'}
                </Badge>
                <Badge className="rounded-pill border-0 px-2 py-0.5 text-[10px]" style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--text-secondary)' }}>
                  {user?.tier || 'Tier I'}
                </Badge>
              </div>
              <h1 className="font-display text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
                {t('welcomeBack', language)}, {user?.fullName?.split(' ')[0] || 'User'}
              </h1>
              <p className="mt-1 max-w-md text-sm text-[var(--text-secondary)]">{t('accountHealthMsg', language)}</p>
            </div>
            <div className="flex flex-shrink-0 gap-3">
              <Link to="/assistant">
                <button type="button" className="btn-gradient-purple flex items-center gap-2 px-5 py-2.5 text-sm">
                  <Sparkles className="h-4 w-4" /> {t('askAI', language)}
                </button>
              </Link>
              <Link to="/calculator">
                <button type="button" className="btn-gradient-blue flex items-center gap-2 px-5 py-2.5 text-sm">
                  <Calculator className="h-4 w-4" /> {t('calculate', language)}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {!hasData && user?.onboardingComplete && (
        <motion.div variants={item} className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm text-amber-200">
          {t('completeProfileBanner', language)}{' '}
          <Link to="/profile" className="font-medium text-pp-purple-light underline">
            {t('goToProfile', language)}
          </Link>
        </motion.div>
      )}

      {/* KPI row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: t('kpiCurrentCorpus', language),
            value: display(currentCorpus, formatINRCompact),
            sub: hasData ? t('kpiCorpusSub', language).replace('{pct}', goalPct.toFixed(0)) : '—',
            badge: hasData ? `${goalPct.toFixed(0)}% ${t('of5CrGoal', language)}` : '—',
            icon: PiggyBank,
            color: '#9D5CF6',
            bg: 'rgba(124,58,237,0.15)',
            progress: goalPct,
          },
          {
            title: t('kpiMonthlyContribution', language),
            value: display(monthly, formatINRCompact),
            sub: hasData
              ? `${t('kpiRecommended', language)} ${recommendedSip > 0 ? formatINRCompact(recommendedSip) : '—'}/mo`
              : '—',
            badge:
              hasData && recommendedSip > monthly
                ? `${formatINRCompact(recommendedSip - monthly)} ${t('kpiShort', language)}`
                : hasData
                  ? t('onTrack', language)
                  : '—',
            icon: Wallet,
            color: '#3B82F6',
            bg: 'rgba(59,130,246,0.15)',
            warn: hasData && recommendedSip > monthly,
          },
          {
            title: t('kpiProjectedCorpus', language),
            value: display(financial?.projectedCorpus, formatINRCompact),
            sub: hasData ? `${returnRate}% ${t('annualReturn', language)}` : '—',
            badge: hasData ? `${t('byAge', language)} ${retirementAge}` : '—',
            icon: TrendingUp,
            color: '#14B8A6',
            bg: 'rgba(20,184,166,0.15)',
          },
          {
            title: t('estMonthlyPension', language),
            value: display(simSpec ? simSpec.monthly_pension : undefined, formatINR),
            sub: hasData && simSpec ? `${t('lumpSumLabel', language)} ${formatINRCompact(simSpec.lump_sum)}` : '—',
            badge: hasData ? t('badgeAnnuity6', language) : '—',
            icon: IndianRupee,
            color: '#F59E0B',
            bg: 'rgba(245,158,11,0.15)',
          },
        ].map((k) => (
          <motion.div key={k.title} variants={item}>
            <div className="gradient-border rounded-2xl p-5" style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)' }}>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: k.bg }}>
                  <k.icon className="h-5 w-5" style={{ color: k.color }} />
                </div>
                <span
                  className="rounded-pill px-2 py-0.5 text-[10px] font-medium"
                  style={{
                    background: (k as { warn?: boolean }).warn ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.12)',
                    color: (k as { warn?: boolean }).warn ? '#F59E0B' : '#10B981',
                  }}
                >
                  {k.badge}
                </span>
              </div>
              <p className="font-mono text-2xl font-bold tracking-tight text-[var(--text-primary)]">{k.value}</p>
              <p className="micro-label mt-1 text-xs text-[var(--text-muted)]">{k.title}</p>
              <p className="mt-1 text-[11px] text-[var(--text-secondary)]">{k.sub}</p>
              {'progress' in k && typeof k.progress === 'number' && hasData && (
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]">
                  <div className="h-full rounded-full bg-pp-purple" style={{ width: `${Math.min(100, k.progress)}%` }} />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Insights + Chart + Goal */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="space-y-3 lg:col-span-3">
          <h3 className="font-display text-sm font-semibold text-[var(--text-primary)]">{t('topInsights', language)}</h3>
          {hasData && financial && simInput ? (
            <>
              <InsightCard
                border="#7C3AED"
                title={t('insightSip5crTitle', language)}
                body={`${t('insightSip5crBody', language)
                  .replace('{m}', formatINRCompact(monthly))
                  .replace('{proj}', formatINRCompact(financial.projectedCorpus))
                  .replace('{need}', formatINRCompact(Math.max(0, recommendedSip - monthly)))}`}
                value={`+${formatINRCompact(Math.max(0, recommendedSip - monthly))}/mo`}
              />
              <InsightCard
                border="#10B981"
                title={t('insightTaxTitle', language)}
                body={t('insightTaxBody', language)}
                value={t('insightTaxValue', language)}
              />
              <InsightCard
                border="#F59E0B"
                title={t('insightEarlyTitle', language)}
                body={
                  sipFor55 > 0
                    ? t('insightEarlyBody', language).replace('{sip}', formatINRCompact(sipFor55))
                    : t('insightEarlyNa', language)
                }
                value={sipFor55 > 0 ? formatINRCompact(sipFor55) + '/mo' : '—'}
              />
            </>
          ) : (
            [1, 2, 3].map((i) => (
              <div key={i} className="h-24 animate-pulse rounded-2xl bg-[rgba(255,255,255,0.06)]" />
            ))
          )}
        </div>

        <div className="lg:col-span-6">
          <Card className="h-full border-0 shadow-card" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-base text-[var(--text-primary)]">{t('corpusGrowthProjection', language)}</CardTitle>
            </CardHeader>
            <CardContent>
              {hasData && chartSeries.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={chartSeries}>
                    <defs>
                      <linearGradient id="corpProj" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis
                      dataKey="age"
                      type="number"
                      domain={[age, 75]}
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      label={{ value: t('age', language), position: 'insideBottom', offset: -4, fill: '#64748b', fontSize: 10 }}
                    />
                    <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickFormatter={(v) => formatINRCompact(v)} />
                    <Tooltip formatter={(v: number) => formatINR(v)} labelFormatter={(a) => `${t('age', language)} ${a}`} />
                    <Area type="monotone" dataKey="corpus" stroke="#7C3AED" fill="url(#corpProj)" strokeWidth={2} />
                    <ReferenceLine
                      x={retirementAge}
                      stroke="#94a3b8"
                      strokeDasharray="4 4"
                      label={{ value: t('retirement', language), fill: '#94a3b8', fontSize: 10 }}
                    />
                    <ReferenceDot x={age} y={currentCorpus} r={5} fill="#10B981" stroke="#0D1120" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-[280px] items-center justify-center text-sm text-[var(--text-muted)]">—</div>
              )}
              {hasData && financial && (
                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[rgba(255,255,255,0.06)] pt-4 sm:grid-cols-4">
                  <StatMini label={t('totalContributions', language)} value={formatINRCompact(financial.totalContributions)} />
                  <StatMini label={t('totalReturns', language)} value={formatINRCompact(financial.totalReturns)} />
                  <StatMini label={t('yearsToRetire', language)} value={`${financial.yearsRemaining} yrs`} />
                  <StatMini label={t('totalTaxSavedEst', language)} value={formatINRCompact(totalTaxSavedEst)} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 lg:col-span-3">
          <Card className="border-0 shadow-card" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-sm text-[var(--text-primary)]">{t('goalTracker', language)}</CardTitle>
            </CardHeader>
            <CardContent>
              {hasData ? (
                <>
                  <SemiGauge pct={goalPct} label={t('of5CrGoal', language)} />
                  <div className="mt-4 space-y-2 text-xs text-[var(--text-secondary)]">
                    <p>
                      <span className="text-[var(--text-muted)]">{t('onCurrentSip', language)}</span>{' '}
                      <span className="font-mono text-[var(--text-primary)]">{formatINRCompact(financial?.projectedCorpus ?? 0)}</span>
                    </p>
                    <p>
                      <span className="text-[var(--text-muted)]">{t('ifRecommendedSip', language)}</span>{' '}
                      <span className="font-mono text-[var(--text-primary)]">
                        {sipAtRecommended != null ? formatINRCompact(sipAtRecommended) : '—'}
                      </span>
                    </p>
                    <p className={corpusGap > 0 ? 'text-rose-400' : 'text-emerald-400'}>
                      <span className="text-[var(--text-muted)]">{t('corpusGap', language)}</span>{' '}
                      <span className="font-mono">
                        {corpusGap >= 0 ? formatINRCompact(corpusGap) : `−${formatINRCompact(-corpusGap)}`}
                      </span>
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-center text-sm text-[var(--text-muted)]">—</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-sm text-[var(--text-primary)]">{t('retirementTimeline', language)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {hasData ? (
                milestones.map((m, i) => (
                  <div key={m.age} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-pp-purple" />
                      {i < milestones.length - 1 && <div className="mt-1 min-h-[28px] w-px flex-1 bg-[rgba(255,255,255,0.08)]" />}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--text-primary)]">
                        {m.age === age ? t('today', language) : `${t('age', language)} ${m.age}`}
                      </p>
                      <p className="font-mono text-sm text-[var(--text-secondary)]">{formatINRCompact(m.corpus)}</p>
                      <p className="text-[10px] text-[var(--text-muted)]">{m.note}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[var(--text-muted)]">—</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Asset allocation */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-card" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <CardHeader>
            <CardTitle className="font-display text-base text-[var(--text-primary)]">{t('assetAllocationSuggest', language)}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {hasData ? (
              <>
                <div className="flex h-3 w-full overflow-hidden rounded-full">
                  <div style={{ width: `${alloc.eq}%`, background: '#7C3AED' }} title="E" />
                  <div style={{ width: `${alloc.corp}%`, background: '#3B82F6' }} title="C" />
                  <div style={{ width: `${alloc.gov}%`, background: '#14B8A6' }} title="G" />
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-[var(--text-secondary)]">
                  <span>Equity {alloc.eq}%</span>
                  <span>Corp. bonds {alloc.corp}%</span>
                  <span>Govt. {alloc.gov}%</span>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-[rgba(255,255,255,0.06)] p-4">
                    <p className="text-[11px] text-[var(--text-muted)]">{t('lumpSum60', language)}</p>
                    <p className="font-mono text-lg font-semibold text-[var(--text-primary)]">
                      {simSpec ? formatINRCompact(simSpec.lump_sum) : '—'}
                    </p>
                    <Badge className="mt-1 border-0 text-[10px]" style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981' }}>
                      {t('taxFree', language)}
                    </Badge>
                  </div>
                  <div className="rounded-xl border border-[rgba(255,255,255,0.06)] p-4">
                    <p className="text-[11px] text-[var(--text-muted)]">{t('annuity40', language)}</p>
                    <p className="font-mono text-lg font-semibold text-[var(--text-primary)]">
                      {simSpec ? formatINRCompact(simSpec.annuity) : '—'}
                    </p>
                    <Badge className="mt-1 border-0 text-[10px]" style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B' }}>
                      {t('taxableIncome', language)}
                    </Badge>
                  </div>
                  <div className="rounded-xl border border-[rgba(255,255,255,0.06)] p-4">
                    <p className="text-[11px] text-[var(--text-muted)]">{t('monthlyPension6', language)}</p>
                    <p className="font-mono text-lg font-semibold text-[var(--text-primary)]">
                      {simSpec ? formatINR(simSpec.monthly_pension) : '—'}
                    </p>
                    <Badge className="mt-1 border-0 text-[10px]" style={{ background: 'rgba(59,130,246,0.12)', color: '#3B82F6' }}>
                      @ 6%
                    </Badge>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-[var(--text-muted)]">—</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div variants={item} className="lg:col-span-1">
          <Card className="h-full border-0 shadow-card" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base text-[var(--text-primary)]">{t('quickActions', language)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {quickActions.map((action) => (
                <Link key={action.label} to={action.path}>
                  <div
                    className="group flex cursor-pointer items-center gap-3 rounded-xl p-3 transition-all duration-150"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(124,58,237,0.06)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.color}`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <span className="flex-1 text-sm font-medium text-[var(--text-primary)]">{action.label}</span>
                    <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="lg:col-span-2">
          <Card className="h-full border-0 shadow-card" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="font-display text-base text-[var(--text-primary)]">{t('recentConversations', language)}</CardTitle>
                <Link to="/assistant" className="text-xs text-pp-purple transition-colors hover:text-pp-purple-light">
                  {t('viewAll', language)}
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              {recentChats.map((chat, idx) => (
                <Link key={chat.title} to="/assistant">
                  <div
                    className="flex cursor-pointer items-start gap-3 rounded-xl p-3 transition-all duration-150"
                    style={{ background: idx % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(124,58,237,0.06)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = idx % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent';
                    }}
                  >
                    <div className="mt-1 flex flex-col items-center">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ background: chat.dotColor }} />
                      {idx < recentChats.length - 1 && (
                        <div className="mt-1 min-h-[24px] w-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[var(--text-primary)]">{chat.title}</span>
                        <span className="flex items-center gap-1 text-[11px] text-[var(--text-muted)]">
                          <Clock className="h-3 w-3" /> {chat.time}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-[var(--text-secondary)]">{chat.snippet}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

function InsightCard({ border, title, body, value }: { border: string; title: string; body: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] p-4" style={{ borderLeftWidth: 4, borderLeftColor: border }}>
      <p className="text-sm font-bold text-[var(--text-primary)]">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">{body}</p>
      <p className="mt-2 font-mono text-sm font-semibold" style={{ color: border }}>
        {value}
      </p>
    </div>
  );
}

function StatMini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] text-[var(--text-muted)]">{label}</p>
      <p className="font-mono text-sm font-semibold text-[var(--text-primary)]">{value}</p>
    </div>
  );
}

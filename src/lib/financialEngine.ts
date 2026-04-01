import type { FinancialSimulationResult, WithdrawalMode, YearlyProjection } from '@/types';

/** Inputs for month-by-month NPS corpus simulation (single source of truth). */
export interface YearByYearSimulationInput {
  age: number;
  retirementAge: number;
  currentCorpus: number;
  monthlyContribution: number;
  /** At each year boundary: monthly *= (1 + incomeGrowth). */
  incomeGrowthRatePercent: number;
  expectedReturnAnnualPercent: number;
}

/**
 * Month-by-month simulation (same as simulateCorpus):
 * Each month: corpus += monthly; corpus *= (1 + annualReturn/12); totalContributions += monthly.
 * After each full year: monthly *= (1 + incomeGrowth).
 */
export function yearByYearSimulation(input: YearByYearSimulationInput): FinancialSimulationResult {
  const r = simulateCorpusRaw(input);
  return {
    projectedCorpus: r.projectedCorpus,
    totalContributions: r.totalContributions,
    totalReturns: r.investmentReturns,
    initialCorpus: r.initialCorpus,
    yearsRemaining: r.years,
    yearlyBreakdown: r.yearlyRows,
    finalMonthlyContribution: r.finalMonthly,
  };
}

/** Raw simulation matching dashboard/calculator algorithm. */
function simulateCorpusRaw(input: YearByYearSimulationInput) {
  const {
    age,
    retirementAge,
    currentCorpus,
    monthlyContribution: startMonthly,
    incomeGrowthRatePercent,
    expectedReturnAnnualPercent,
  } = input;

  const initialCorpus = Math.max(0, currentCorpus);
  let corpus = initialCorpus;
  let monthly = Math.max(0, startMonthly);
  const annualReturn = expectedReturnAnnualPercent / 100;
  const incomeGrowth = incomeGrowthRatePercent / 100;
  const years = Math.max(0, retirementAge - age);

  let totalContributions = 0;
  const yearlyRows: YearlyProjection[] = [];
  const yearlyData: { year: number; corpus: number; age: number }[] = [];

  for (let year = 1; year <= years; year++) {
    let yearContrib = 0;
    const yearStartCorpus = corpus;

    for (let month = 1; month <= 12; month++) {
      corpus += monthly;
      totalContributions += monthly;
      yearContrib += monthly;
      corpus *= 1 + annualReturn / 12;
    }

    monthly *= 1 + incomeGrowth;

    const returnsThisYear = corpus - yearStartCorpus - yearContrib;
    const taxBenefit = Math.min(yearContrib, 200000) * 0.3;
    const ageEnd = age + year;

    yearlyRows.push({
      age: ageEnd,
      year: new Date().getFullYear() + year,
      contribution: Math.round(yearContrib),
      returns: Math.round(returnsThisYear),
      corpus: Math.round(corpus),
      taxBenefit: Math.round(taxBenefit),
    });
    yearlyData.push({ year, corpus: Math.round(corpus), age: ageEnd });
  }

  const projectedCorpus = Math.round(corpus);
  const investmentReturns = Math.round(projectedCorpus - totalContributions - initialCorpus);

  return {
    projectedCorpus,
    totalContributions: Math.round(totalContributions),
    investmentReturns,
    initialCorpus: Math.round(initialCorpus),
    years,
    yearlyRows,
    yearlyData,
    finalMonthly: monthly,
  };
}

/** Public API per product spec — use everywhere for consistency. */
export function simulateCorpus(profile: {
  age: number;
  retirement_age: number;
  current_corpus: number;
  monthly_contribution: number;
  expected_return_rate: number;
  income_growth_rate: number;
}) {
  const raw = simulateCorpusRaw({
    age: profile.age,
    retirementAge: profile.retirement_age,
    currentCorpus: profile.current_corpus,
    monthlyContribution: profile.monthly_contribution,
    incomeGrowthRatePercent: profile.income_growth_rate,
    expectedReturnAnnualPercent: profile.expected_return_rate,
  });
  const pc = raw.projectedCorpus;
  return {
    projected_corpus: pc,
    total_contributions: raw.totalContributions,
    investment_returns: raw.investmentReturns,
    lump_sum: pc * 0.6,
    annuity: pc * 0.4,
    monthly_pension: (pc * 0.4 * 0.06) / 12,
    yearly_data: raw.yearlyData,
  };
}

/** Corpus at end of year when user reaches targetAge (same simulation rules). */
export function projectCorpusAtAge(input: YearByYearSimulationInput, targetAge: number): number {
  if (targetAge <= input.age) return Math.round(input.currentCorpus);
  const raw = simulateCorpusRaw({ ...input, retirementAge: targetAge });
  return raw.projectedCorpus;
}

/** Chart points from current age through max( retirement, maxAge ) — default 75. */
export function buildCorpusProjectionChartSeries(
  input: YearByYearSimulationInput,
  maxAge = 75
): Array<{ age: number; corpus: number }> {
  const endAge = Math.max(input.retirementAge, maxAge);
  const sim = yearByYearSimulation({ ...input, retirementAge: endAge });
  return [
    { age: input.age, corpus: sim.initialCorpus },
    ...sim.yearlyBreakdown.map((row) => ({ age: row.age, corpus: row.corpus })),
  ];
}

/** NPS withdrawal: normal retirement (min 40% annuity → max 60% lump); premature (min 80% annuity, max 20% lump). */
export function withdrawalShares(mode: WithdrawalMode): { lumpShare: number; annuityShare: number } {
  if (mode === 'premature') return { lumpShare: 0.2, annuityShare: 0.8 };
  return { lumpShare: 0.6, annuityShare: 0.4 };
}

/**
 * Lump sum, annuity pool, and monthly pension from annuity pool.
 * monthlyPension = (annuityAmount * (annuityRatePercent / 100)) / 12
 */
export function calculatePension(
  projectedCorpus: number,
  annuityRatePercent: number,
  mode: WithdrawalMode
): { lumpSum: number; annuityAmount: number; monthlyPension: number } {
  const { lumpShare, annuityShare } = withdrawalShares(mode);
  const lumpSum = Math.round(projectedCorpus * lumpShare);
  const annuityAmount = Math.round(projectedCorpus * annuityShare);
  const r = annuityRatePercent / 100;
  const monthlyPension = Math.round((annuityAmount * r) / 12);
  return { lumpSum, annuityAmount, monthlyPension };
}

/**
 * Required monthly SIP (PMT) to reach target corpus, with existing corpus compounding at r monthly.
 * P = FV_needed * r / ((1+r)^n - 1), FV_needed = target - FV_existing.
 */
export function calculateRequiredSIP(params: {
  targetCorpus: number;
  targetAge: number;
  currentAge: number;
  currentCorpus: number;
  expectedReturnAnnualPercent: number;
}): number {
  const { targetCorpus, targetAge, currentAge, currentCorpus, expectedReturnAnnualPercent } = params;
  const years = Math.max(0, targetAge - currentAge);
  const n = years * 12;
  if (n <= 0) return 0;

  const annual = expectedReturnAnnualPercent / 100;
  const r = annual / 12;
  const fvExisting = currentCorpus * Math.pow(1 + r, n);
  const fvNeeded = targetCorpus - fvExisting;
  if (fvNeeded <= 0) return 0;
  if (r < 1e-12) return fvNeeded / n;

  const denom = Math.pow(1 + r, n) - 1;
  if (denom <= 0) return 0;
  return (fvNeeded * r) / denom;
}

/** Projected corpus at retirementAgeTarget using same simulation rules. */
export function projectCorpusForRetirementAge(
  base: YearByYearSimulationInput,
  retirementAgeTarget: number
): number {
  const sim = yearByYearSimulation({ ...base, retirementAge: retirementAgeTarget });
  return sim.projectedCorpus;
}

/** Attach withdrawal + pension to a simulation result. */
export function enrichWithPension(
  sim: FinancialSimulationResult,
  annuityRatePercent: number,
  mode: WithdrawalMode
): FinancialSimulationResult {
  const { lumpSum, annuityAmount, monthlyPension } = calculatePension(
    sim.projectedCorpus,
    annuityRatePercent,
    mode
  );
  return {
    ...sim,
    lumpSumWithdrawal: lumpSum,
    annuityAmount,
    monthlyPension,
  };
}

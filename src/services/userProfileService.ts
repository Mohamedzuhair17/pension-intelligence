import type { User } from '@/types';
import {
  calculatePension,
  enrichWithPension,
  yearByYearSimulation,
  type YearByYearSimulationInput,
} from '@/lib/financialEngine';

/** Build simulation input from user profile fields (defaults safe for missing data). */
export function profileToSimulationInput(user: User): YearByYearSimulationInput {
  const age = user.npsData?.age ?? 35;
  const retirementAge = user.targetRetirementAge ?? user.npsData?.retirementAge ?? 60;
  const monthly =
    user.monthlyNpsContribution ??
    (user.npsData?.thisYearContribution ? user.npsData.thisYearContribution / 12 : 5000);
  return {
    age,
    retirementAge,
    currentCorpus: user.npsData?.totalCorpus ?? 0,
    monthlyContribution: Math.max(0, monthly),
    incomeGrowthRatePercent: user.incomeGrowthRate ?? 8,
    expectedReturnAnnualPercent: user.expectedReturnRate ?? 10,
  };
}

/**
 * Recompute npsData totals from FinancialEngine so Dashboard / assistant stay aligned.
 */
export function syncNpsDerivedData(user: User): User {
  const input = profileToSimulationInput(user);
  const sim = yearByYearSimulation(input);
  const annuityRate = user.annuityRate ?? 6;
  const enriched = enrichWithPension(sim, annuityRate, 'normal');
  const pension = calculatePension(enriched.projectedCorpus, annuityRate, 'normal');

  const years = Math.max(
    0,
    (user.targetRetirementAge ?? user.npsData?.retirementAge ?? 60) - (user.npsData?.age ?? 35)
  );
  const history = enriched.yearlyBreakdown.map((row) => ({
    year: String(row.year),
    corpus: row.corpus,
  }));

  return {
    ...user,
    npsData: {
      totalCorpus: user.npsData?.totalCorpus ?? input.currentCorpus,
      totalContributions: enriched.totalContributions,
      totalReturns: enriched.totalReturns,
      monthlyPension: pension.monthlyPension,
      taxSaved: user.npsData?.taxSaved ?? 0,
      thisYearContribution: user.npsData?.thisYearContribution ?? 0,
      annualContributionTarget: user.npsData?.annualContributionTarget ?? 150000,
      age: input.age,
      retirementAge: input.retirementAge,
      yearsToRetirement: years,
      equityAllocation: user.npsData?.equityAllocation ?? 50,
      bondAllocation: user.npsData?.bondAllocation ?? 30,
      govSecAllocation: user.npsData?.govSecAllocation ?? 20,
      fundManager: user.npsData?.fundManager ?? 'SBI Pension Funds',
      lastContributionDate: user.npsData?.lastContributionDate ?? new Date().toISOString().slice(0, 10),
      contributionHistory: user.npsData?.contributionHistory ?? [],
      corpusGrowthHistory: history.length ? history : user.npsData?.corpusGrowthHistory ?? [],
      projectedCorpusAtRetirement: enriched.projectedCorpus,
    },
  };
}

export function getProfile(userId: string, user: User | null): User | null {
  if (!user || user.id !== userId) return user;
  return user;
}

export function saveProfile(user: User | null, partial: Partial<User>): User | null {
  if (!user) return null;
  const merged = { ...user, ...partial };
  return syncNpsDerivedData(merged);
}

export function isOnboardingComplete(user: User | null): boolean {
  return user?.onboardingComplete === true;
}

export function markOnboardingComplete(user: User, complete: boolean): User {
  const next = { ...user, onboardingComplete: complete };
  return complete ? syncNpsDerivedData(next) : next;
}

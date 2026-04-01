import type { FinancialSimulationResult, Insight, InsightCategory, RiskProfile, User } from '@/types';
import {
  calculatePension,
  calculateRequiredSIP,
  enrichWithPension,
  yearByYearSimulation,
} from '@/lib/financialEngine';
import { profileToSimulationInput } from '@/services/userProfileService';
import { formatINRCompact } from '@/lib/formatCurrency';

const TARGET_5CR = 5_00_00_000;

function riskAllocation(age: number, risk: RiskProfile | undefined): { eq: number; corp: number; gov: number } {
  if (age < 40 && risk === 'Aggressive') return { eq: 75, corp: 15, gov: 10 };
  if (age >= 40 && age <= 50 && risk === 'Moderate') return { eq: 50, corp: 30, gov: 20 };
  if (age > 50) return { eq: 25, corp: 45, gov: 30 };
  if (risk === 'Conservative') return { eq: 35, corp: 40, gov: 25 };
  if (risk === 'Aggressive') return { eq: 65, corp: 25, gov: 10 };
  return { eq: 50, corp: 30, gov: 20 };
}

/** Assumed marginal rate for 80CCD(1B) illustration: 30% above ₹10L annual income. */
function taxRate80ccd(annualIncome: number): number {
  return annualIncome > 10_00_000 ? 0.3 : 0;
}

export function generateInsights(user: User | null, financial: FinancialSimulationResult): Insight[] {
  if (!user?.npsData) return [];

  const age = user.npsData.age;
  const retirementAge = user.targetRetirementAge ?? user.npsData.retirementAge;
  const monthly = user.monthlyNpsContribution ?? 0;
  const annualIncome = user.annualIncome ?? 0;
  const risk = user.riskProfile;
  const target = user.targetCorpus;
  const annuityRate = user.annuityRate ?? 6;

  const baseInput = profileToSimulationInput(user);
  const pension = calculatePension(financial.projectedCorpus, annuityRate, 'normal');

  const insights: Insight[] = [];

  const sip5cr = calculateRequiredSIP({
    targetCorpus: TARGET_5CR,
    targetAge: retirementAge,
    currentAge: age,
    currentCorpus: user.npsData.totalCorpus ?? 0,
    expectedReturnAnnualPercent: user.expectedReturnRate ?? 10,
  });

  insights.push({
    category: 'contribution',
    title: 'Reach ₹5Cr goal',
    description: `Invest ${formatINRCompact(sip5cr)}/month to reach ₹5Cr by age ${retirementAge} (illustrative, ${user.expectedReturnRate ?? 10}% return).`,
    value: formatINRCompact(sip5cr) + '/mo',
    actionableTip:
      monthly > 0 && sip5cr > monthly
        ? `You contribute ${formatINRCompact(monthly)}/mo; raising toward ${formatINRCompact(sip5cr)}/mo closes the ₹5Cr gap.`
        : 'Review your Tier II / voluntary contributions to align with long-term goals.',
  });

  insights.push({
    category: 'projection',
    title: 'Your retirement corpus',
    description: `On current pace you may accumulate ${formatINRCompact(financial.projectedCorpus)} by age ${retirementAge}.`,
    value: formatINRCompact(financial.projectedCorpus),
    actionableTip: 'Adjust monthly SIP or return assumption in the calculator to stress-test this projection.',
  });

  const early5 = retirementAge - 5;
  const early10 = retirementAge - 10;
  if (early5 > age) {
    const sip5 = calculateRequiredSIP({
      targetCorpus: financial.projectedCorpus,
      targetAge: early5,
      currentAge: age,
      currentCorpus: user.npsData.totalCorpus ?? 0,
      expectedReturnAnnualPercent: user.expectedReturnRate ?? 10,
    });
    insights.push({
      category: 'earlyRetirement',
      title: `Retire at ${early5}`,
      description: `Rough monthly SIP needed to match your projected corpus by age ${early5}: ${formatINRCompact(sip5)}/month (same return assumption).`,
      value: formatINRCompact(sip5) + '/mo',
      actionableTip: 'Early retirement requires higher savings or lower expense goals—see Goal Planner.',
    });
  }

  if (early10 > age && early10 !== early5) {
    const sip10 = calculateRequiredSIP({
      targetCorpus: financial.projectedCorpus,
      targetAge: early10,
      currentAge: age,
      currentCorpus: user.npsData.totalCorpus ?? 0,
      expectedReturnAnnualPercent: user.expectedReturnRate ?? 10,
    });
    insights.push({
      category: 'earlyRetirement',
      title: `Retire at ${early10}`,
      description: `Illustrative SIP to target the same corpus by age ${early10}: ${formatINRCompact(sip10)}/month.`,
      value: formatINRCompact(sip10) + '/mo',
      actionableTip: 'Compare with your current monthly contribution in Profile.',
    });
  }

  const taxSaved = Math.round(50_000 * taxRate80ccd(annualIncome));
  insights.push({
    category: 'tax',
    title: '80CCD(1B) tax saving',
    description:
      annualIncome > 10_00_000
        ? `You could save up to ${formatINRCompact(taxSaved)} in tax by using the full ₹50,000 extra NPS deduction (30% slab illustration).`
        : `Additional ₹50,000 under 80CCD(1B) may reduce tax depending on your slab.`,
    value: formatINRCompact(taxSaved),
    actionableTip: 'Maximize ₹50,000 under 80CCD(1B) before 31 March if eligible.',
  });

  const alloc = riskAllocation(age, risk);
  insights.push({
    category: 'risk',
    title: 'Suggested allocation mix',
    description: `Based on age ${age} and ${risk ?? 'Moderate'} profile: ~${alloc.eq}% equity, ${alloc.corp}% corporate bonds, ${alloc.gov}% government bonds (illustrative).`,
    value: `${alloc.eq}% / ${alloc.corp}% / ${alloc.gov}%`,
    actionableTip: 'Within NPS, choose Active / Auto choice to align with your risk preference.',
  });

  insights.push({
    category: 'pension',
    title: 'Monthly pension estimate',
    description: `At retirement, 40% annuity at ${annuityRate}% p.a. implies ~${formatINRCompact(pension.monthlyPension)}/month pension (illustrative).`,
    value: formatINRCompact(pension.monthlyPension) + '/mo',
    actionableTip: 'Annuity rates vary by provider; use the calculator annuity slider to stress-test.',
  });

  if (target != null && target > 0) {
    const gap = target - financial.projectedCorpus;
    const extraSip =
      gap > 0
        ? calculateRequiredSIP({
            targetCorpus: target,
            targetAge: retirementAge,
            currentAge: age,
            currentCorpus: user.npsData.totalCorpus ?? 0,
            expectedReturnAnnualPercent: user.expectedReturnRate ?? 10,
          }) - monthly
        : 0;

    insights.push({
      category: 'goal',
      title: 'Corpus gap',
      description:
        gap > 0
          ? `You are ${formatINRCompact(gap)} short of your ${formatINRCompact(target)} goal. Closing it may need ~${formatINRCompact(Math.max(0, extraSip))}/month more (illustrative).`
          : `You are on track vs your ${formatINRCompact(target)} target.`,
      value: gap > 0 ? formatINRCompact(gap) : 'On track',
      actionableTip: 'Update target corpus in Profile or use Goal Planner for exact SIP.',
    });
  }

  return insights.slice(0, 7);
}

/** Recompute financial result for insights when only user reference changes. */
export function computeFinancialForUser(user: User | null): FinancialSimulationResult | null {
  if (!user) return null;
  const input = profileToSimulationInput(user);
  const sim = yearByYearSimulation(input);
  const annuityRate = user.annuityRate ?? 6;
  return enrichWithPension(sim, annuityRate, 'normal');
}

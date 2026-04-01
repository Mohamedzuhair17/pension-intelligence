import { describe, expect, it } from 'vitest';
import {
  calculatePension,
  calculateRequiredSIP,
  projectCorpusForRetirementAge,
  withdrawalShares,
  yearByYearSimulation,
} from './financialEngine';

describe('yearByYearSimulation', () => {
  it('1 year, zero growth, fixed monthly: contributions = 12 * monthly', () => {
    const r = yearByYearSimulation({
      age: 40,
      retirementAge: 41,
      currentCorpus: 0,
      monthlyContribution: 5000,
      incomeGrowthRatePercent: 0,
      expectedReturnAnnualPercent: 0,
    });
    expect(r.totalContributions).toBe(5000 * 12);
    expect(r.projectedCorpus).toBe(5000 * 12);
    expect(r.totalReturns).toBe(0);
  });

  it('includes initial corpus in projected total but not in totalContributions', () => {
    const r = yearByYearSimulation({
      age: 40,
      retirementAge: 41,
      currentCorpus: 100000,
      monthlyContribution: 0,
      incomeGrowthRatePercent: 0,
      expectedReturnAnnualPercent: 0,
    });
    expect(r.totalContributions).toBe(0);
    expect(r.projectedCorpus).toBe(100000);
    expect(r.totalReturns).toBe(0);
  });

  it('returns zero years when retirement equals age', () => {
    const r = yearByYearSimulation({
      age: 40,
      retirementAge: 40,
      currentCorpus: 1000,
      monthlyContribution: 1000,
      incomeGrowthRatePercent: 0,
      expectedReturnAnnualPercent: 10,
    });
    expect(r.yearsRemaining).toBe(0);
    expect(r.projectedCorpus).toBe(1000);
  });
});

describe('calculatePension', () => {
  it('normal mode: 60% lump, 40% annuity, 6% annuity rate', () => {
    const p = calculatePension(1_00_00_000, 6, 'normal');
    expect(p.lumpSum).toBe(60_00_000);
    expect(p.annuityAmount).toBe(40_00_000);
    expect(p.monthlyPension).toBe(20_000);
  });

  it('premature: 20% lump, 80% annuity', () => {
    const p = calculatePension(10_00_000, 6, 'premature');
    expect(withdrawalShares('premature')).toEqual({ lumpShare: 0.2, annuityShare: 0.8 });
    expect(p.lumpSum).toBe(2_00_000);
    expect(p.annuityAmount).toBe(8_00_000);
  });
});

describe('calculateRequiredSIP', () => {
  it('returns 0 when target already covered by FV of corpus', () => {
    const p = calculateRequiredSIP({
      targetCorpus: 1000,
      targetAge: 50,
      currentAge: 40,
      currentCorpus: 1_00_00_000,
      expectedReturnAnnualPercent: 8,
    });
    expect(p).toBe(0);
  });

  it('positive SIP when gap exists', () => {
    const p = calculateRequiredSIP({
      targetCorpus: 1_00_00_000,
      targetAge: 50,
      currentAge: 40,
      currentCorpus: 0,
      expectedReturnAnnualPercent: 8,
    });
    expect(p).toBeGreaterThan(0);
  });
});

describe('projectCorpusForRetirementAge', () => {
  it('shorter horizon gives lower corpus', () => {
    const base = {
      age: 30,
      retirementAge: 60,
      currentCorpus: 0,
      monthlyContribution: 5000,
      incomeGrowthRatePercent: 0,
      expectedReturnAnnualPercent: 8,
    };
    const at60 = projectCorpusForRetirementAge(base, 60);
    const at55 = projectCorpusForRetirementAge(base, 55);
    expect(at55).toBeLessThan(at60);
  });
});

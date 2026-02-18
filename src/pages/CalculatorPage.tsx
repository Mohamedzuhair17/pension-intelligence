import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator as CalcIcon, Download, Share2, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import type { CalculatorInput } from '@/types';

const COLORS = ['hsl(28, 90%, 52%)', 'hsl(222, 60%, 18%)', 'hsl(152, 60%, 42%)', 'hsl(199, 89%, 48%)'];

const defaults: CalculatorInput = {
  age: 30,
  retirementAge: 60,
  currentIncome: 800000,
  incomeGrowth: 5,
  inflationRate: 6,
  annualContribution: 60000,
  contributionIncrease: 5,
  equityAllocation: 50,
  corporateBondAllocation: 30,
  govSecAllocation: 20,
  expectedReturn: 10,
  currentBalance: 0,
  annuityPercentage: 40,
};

function formatINR(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
}

export default function CalculatorPage() {
  const [inputs, setInputs] = useState<CalculatorInput>(defaults);

  const update = (key: keyof CalculatorInput, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const results = useMemo(() => {
    const years = inputs.retirementAge - inputs.age;
    let corpus = inputs.currentBalance;
    let totalContributions = inputs.currentBalance;
    let annualContrib = inputs.annualContribution;
    const rate = inputs.expectedReturn / 100;
    const projections = [];

    for (let i = 0; i < years; i++) {
      const returns = corpus * rate;
      corpus += returns + annualContrib;
      totalContributions += annualContrib;
      const taxBenefit = Math.min(annualContrib, 200000) * 0.3;
      projections.push({
        age: inputs.age + i + 1,
        year: new Date().getFullYear() + i + 1,
        contribution: Math.round(annualContrib),
        returns: Math.round(returns),
        corpus: Math.round(corpus),
        taxBenefit: Math.round(taxBenefit),
      });
      annualContrib *= 1 + inputs.contributionIncrease / 100;
    }

    const lumpSumPct = (100 - inputs.annuityPercentage) / 100;
    const lumpSum = corpus * lumpSumPct;
    const annuityCorpus = corpus * (inputs.annuityPercentage / 100);
    const monthlyPension = (annuityCorpus * 0.06) / 12;

    return {
      projectedCorpus: Math.round(corpus),
      monthlyPension: Math.round(monthlyPension),
      lumpSum: Math.round(lumpSum),
      totalContributions: Math.round(totalContributions),
      totalReturns: Math.round(corpus - totalContributions),
      yearlyProjections: projections,
    };
  }, [inputs]);

  const allocationData = [
    { name: 'Equity', value: inputs.equityAllocation },
    { name: 'Corporate Bonds', value: inputs.corporateBondAllocation },
    { name: 'Govt Securities', value: inputs.govSecAllocation },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <CalcIcon className="w-6 h-6 text-accent" /> Pension Calculator
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Estimate your NPS corpus and monthly pension at retirement</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setInputs(defaults)}>
            <RotateCcw className="w-4 h-4 mr-1" /> Reset
          </Button>
          <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" /> PDF</Button>
          <Button variant="outline" size="sm"><Share2 className="w-4 h-4 mr-1" /> Share</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-sm">Personal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <SliderField label="Current Age" value={inputs.age} min={18} max={65} suffix=" years" onChange={(v) => update('age', v)} />
              <SliderField label="Retirement Age" value={inputs.retirementAge} min={inputs.age + 1} max={70} suffix=" years" onChange={(v) => update('retirementAge', v)} />
              <div className="space-y-2">
                <Label className="text-xs">Annual Income</Label>
                <Input type="number" value={inputs.currentIncome} onChange={(e) => update('currentIncome', +e.target.value)} className="h-9" />
              </div>
              <SliderField label="Income Growth" value={inputs.incomeGrowth} min={0} max={15} suffix="%" step={0.5} onChange={(v) => update('incomeGrowth', v)} />
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-sm">NPS Contribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label className="text-xs">Annual Contribution (₹)</Label>
                <Input type="number" value={inputs.annualContribution} onChange={(e) => update('annualContribution', +e.target.value)} className="h-9" />
              </div>
              <SliderField label="Annual Increase" value={inputs.contributionIncrease} min={0} max={15} suffix="%" step={0.5} onChange={(v) => update('contributionIncrease', v)} />
              <SliderField label="Expected Return" value={inputs.expectedReturn} min={4} max={14} suffix="%" step={0.5} onChange={(v) => update('expectedReturn', v)} />
              <div className="space-y-2">
                <Label className="text-xs">Current NPS Balance (₹)</Label>
                <Input type="number" value={inputs.currentBalance} onChange={(e) => update('currentBalance', +e.target.value)} className="h-9" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-sm">Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <SliderField label="Equity (E)" value={inputs.equityAllocation} min={0} max={75} suffix="%" onChange={(v) => update('equityAllocation', v)} />
              <SliderField label="Corporate Bonds (C)" value={inputs.corporateBondAllocation} min={0} max={100} suffix="%" onChange={(v) => update('corporateBondAllocation', v)} />
              <SliderField label="Govt Securities (G)" value={inputs.govSecAllocation} min={0} max={100} suffix="%" onChange={(v) => update('govSecAllocation', v)} />
              <SliderField label="Annuity %" value={inputs.annuityPercentage} min={40} max={100} suffix="%" onChange={(v) => update('annuityPercentage', v)} />
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={allocationData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={2}>
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

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'Projected Corpus', value: formatINR(results.projectedCorpus), color: 'bg-saffron-light text-saffron' },
              { label: 'Monthly Pension', value: formatINR(results.monthlyPension), color: 'bg-emerald-light text-emerald' },
              { label: 'Lump Sum', value: formatINR(results.lumpSum), color: 'bg-sky-light text-sky' },
              { label: 'Total Contributions', value: formatINR(results.totalContributions), color: 'bg-amber-light text-amber' },
              { label: 'Total Returns', value: formatINR(results.totalReturns), color: 'bg-saffron-light text-saffron' },
              { label: 'Years to Retire', value: `${inputs.retirementAge - inputs.age} yrs`, color: 'bg-secondary text-foreground' },
            ].map((s) => (
              <Card key={s.label} className="shadow-card">
                <CardContent className="p-4">
                  <p className="text-[11px] text-muted-foreground mb-1">{s.label}</p>
                  <p className="font-display text-lg font-bold text-foreground">{s.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Corpus Growth Chart */}
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-sm">Corpus Growth Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={results.yearlyProjections}>
                  <defs>
                    <linearGradient id="corpusGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(222, 60%, 18%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(222, 60%, 18%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 90%)" />
                  <XAxis dataKey="age" tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" label={{ value: 'Age', position: 'insideBottom', offset: -5, fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" tickFormatter={(v) => formatINR(v)} />
                  <Tooltip formatter={(v: number) => formatINR(v)} />
                  <Area type="monotone" dataKey="corpus" stroke="hsl(222, 60%, 18%)" fill="url(#corpusGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Projection Table */}
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-sm">Year-wise Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto max-h-64 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="sticky top-0 bg-card">
                    <tr className="border-b border-border">
                      <th className="text-left p-2 text-muted-foreground font-medium">Age</th>
                      <th className="text-right p-2 text-muted-foreground font-medium">Contribution</th>
                      <th className="text-right p-2 text-muted-foreground font-medium">Returns</th>
                      <th className="text-right p-2 text-muted-foreground font-medium">Corpus</th>
                      <th className="text-right p-2 text-muted-foreground font-medium">Tax Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.yearlyProjections.map((row) => (
                      <tr key={row.age} className="border-b border-border/50 hover:bg-secondary/50">
                        <td className="p-2 font-medium text-foreground">{row.age}</td>
                        <td className="p-2 text-right text-foreground">{formatINR(row.contribution)}</td>
                        <td className="p-2 text-right text-emerald">{formatINR(row.returns)}</td>
                        <td className="p-2 text-right font-medium text-foreground">{formatINR(row.corpus)}</td>
                        <td className="p-2 text-right text-accent">{formatINR(row.taxBenefit)}</td>
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

function SliderField({ label, value, min, max, suffix, step = 1, onChange }: {
  label: string; value: number; min: number; max: number; suffix: string; step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-xs">{label}</Label>
        <span className="text-xs font-semibold text-foreground">{value}{suffix}</span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={([v]) => onChange(v)} />
    </div>
  );
}

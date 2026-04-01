import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, HelpCircle, ChevronDown, ChevronUp, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { t } from '@/i18n/translations';

const faqCategories = [
  {
    titleKey: 'gettingStarted' as const,
    questions: [
      { q: 'What is the National Pension System (NPS)?', a: 'NPS is a voluntary, defined-contribution retirement savings scheme designed by the Government of India. It allows subscribers to make regular contributions during their working life and build a pension corpus for retirement.' },
      { q: 'Who can open an NPS account?', a: 'Any Indian citizen between 18-70 years of age can open an NPS account. This includes salaried employees, self-employed individuals, and NRIs.' },
      { q: 'What is a PRAN?', a: 'PRAN (Permanent Retirement Account Number) is a unique 12-digit number allotted to every NPS subscriber. It remains the same throughout your lifetime and is portable across jobs and locations.' },
    ],
  },
  {
    titleKey: 'contributionsInvesting' as const,
    questions: [
      { q: 'What is the minimum contribution for NPS?', a: 'The minimum contribution for Tier I is ₹500 per contribution and ₹1,000 annually. For Tier II, the minimum is ₹250 per contribution with no annual minimum.' },
      { q: 'What are the different fund types in NPS?', a: 'NPS offers multiple fund types: E (Equity), C (Corporate Bonds), G (Government Securities), and A (Alternative Investment). You can choose between Active Choice and Auto Choice.' },
      { q: 'Can I change my fund allocation?', a: 'Yes, you can change your fund allocation up to 4 times in a financial year. Changes can be made online through the CRA website or through your POP.' },
    ],
  },
  {
    titleKey: 'taxBenefits' as const,
    questions: [
      { q: 'What tax benefits are available under NPS?', a: 'NPS offers multiple tax benefits: Section 80CCD(1) - up to 10% of salary (max ₹1.5L combined with 80C), Section 80CCD(1B) - additional ₹50,000 exclusive deduction, and Section 80CCD(2) - employer contribution up to 14% (Govt) / 10% (Others).' },
      { q: 'Is the NPS maturity amount taxable?', a: 'At maturity, 60% of the corpus can be withdrawn tax-free. The remaining 40% (minimum) must be used to purchase an annuity, which provides regular pension income that is taxable as per your income tax slab.' },
    ],
  },
  {
    titleKey: 'withdrawalsPension' as const,
    questions: [
      { q: 'When can I withdraw from NPS?', a: 'Regular exit is at age 60. Premature exit is allowed after 5 years for specific reasons. Partial withdrawals up to 25% of own contributions are allowed after 3 years for specific purposes.' },
      { q: 'How is the pension amount calculated?', a: 'The pension depends on: your total corpus at retirement, the annuity percentage (minimum 40%), and the annuity rate offered by the insurance company.' },
    ],
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const language = useAppStore((s) => s.language);

  const toggle = (key: string) => {
    setOpenItems((prev) => { const next = new Set(prev); next.has(key) ? next.delete(key) : next.add(key); return next; });
  };

  const filteredCategories = faqCategories.map((cat) => ({
    ...cat,
    questions: cat.questions.filter((q) => q.q.toLowerCase().includes(searchQuery.toLowerCase()) || q.a.toLowerCase().includes(searchQuery.toLowerCase())),
  })).filter((cat) => cat.questions.length > 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl space-y-6">
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4"
          style={{ boxShadow: '0 0 40px rgba(124,58,237,0.3)' }}>
          <HelpCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-2">{t('howCanWeHelp', language)}</h1>
        <p className="text-[var(--text-secondary)] mb-6">{t('searchFaqsOrAsk', language)}</p>
        <div className="relative max-w-lg mx-auto">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <Input
            placeholder={t('searchFaqs', language)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12 text-base"
          />
        </div>
      </div>

      <div className="flex justify-center gap-3 mb-6">
        <Link to="/assistant">
          <button className="btn-gradient-purple px-5 py-2.5 text-sm flex items-center gap-2 rounded-xl">
            <MessageSquare className="w-4 h-4" /> {t('askAIAssistant', language)}
          </button>
        </Link>
        <button className="px-5 py-2.5 text-sm rounded-xl text-[var(--text-secondary)] transition-colors"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
          {t('submitFeedback', language)}
        </button>
      </div>

      {filteredCategories.map((cat) => (
        <div key={cat.titleKey}>
          <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <Badge className="text-[9px] px-2 py-0.5 border-0 rounded-pill" style={{ background: 'rgba(124,58,237,0.12)', color: '#9D5CF6' }}>{cat.questions.length}</Badge>
            {t(cat.titleKey, language)}
          </h2>
          <div className="space-y-2 mb-6">
            {cat.questions.map((faq) => {
              const key = cat.titleKey + faq.q;
              const isOpen = openItems.has(key);
              return (
                <div key={key} className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <button onClick={() => toggle(key)} className="w-full text-left p-4 flex items-center justify-between transition-colors"
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(124,58,237,0.04)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                    <span className="text-sm font-medium text-[var(--text-primary)] pr-4">{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[var(--text-muted)] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[var(--text-muted)] shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="pt-0 pb-4 px-4">
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{faq.a}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-xs text-[var(--text-muted)]">{t('wasThisHelpful', language)}</span>
                        <button className="p-1.5 rounded-lg text-[var(--text-muted)] transition-colors"
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(16,185,129,0.1)'; e.currentTarget.style.color = '#10B981'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg text-[var(--text-muted)] transition-colors"
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = '#EF4444'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                        <Link to="/assistant" className="text-xs text-pp-purple hover:text-pp-purple-light transition-colors ml-auto">{t('askAIForMore', language)}</Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

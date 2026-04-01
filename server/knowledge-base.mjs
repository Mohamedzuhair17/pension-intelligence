export const knowledgeBase = [

  // ─────────────────────────────────────────────
  // ELIGIBILITY
  // ─────────────────────────────────────────────
  {
    id: "eligibility-citizen-age",
    text: "NPS (National Pension System) is open to all Indian citizens between the ages of 18 and 70 years. This includes salaried individuals, self-employed professionals, and business owners. Non-Resident Indians (NRIs) and Overseas Citizenship of India (OCI) holders are also eligible to open an NPS Tier I account, subject to applicable residency norms and FEMA compliance. The minimum age of 18 ensures young earners can start building their retirement corpus early, while the upper limit of 70 allows late entrants and those returning from abroad to participate. The account remains active until the subscriber exits or reaches maturity age.",
    textHindi: "NPS 18 se 70 saal ke Bharatiya nagrikoṃ ke liye khula hai. NRI aur OCI cardholders bhi Tier I khata khol sakte hain, lekin FEMA niyamon ka paalan zaroori hai.",
    source: "PFRDA Guidelines",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "eligibility",
    keywords: ["nps eligibility", "age limit", "18 years", "70 years", "who can join nps", "citizen", "eligible", "open account", "nri", "oci", "resident", "non-resident", "overseas citizen", "can i join nps", "nps age requirement"],
    embedding_hint: "Who is eligible to open an NPS account? Age limit for NPS. Can NRIs open NPS?"
  },
  {
    id: "eligibility-nri-oci-restrictions",
    text: "NRIs and OCI card holders are allowed to open and operate only an NPS Tier I account. They are not permitted to open a Tier II account unless they become Indian residents again. All contributions must comply with FEMA regulations. NRI subscribers must ensure contributions are made through NRE or NRO accounts. If an NRI subscriber's citizenship status changes, they must notify PFRDA. Repatriation of NPS proceeds is subject to prevailing FEMA rules at the time of withdrawal. OCI holders should verify their country's tax treaty with India before contributing, as double taxation may apply on annuity income.",
    textHindi: "NRI aur OCI sirf Tier I account khol sakte hain. FEMA niyamon ka paalan karna zaroori hai. NRE ya NRO account se contribution hona chahiye.",
    source: "PFRDA Circular",
    sourceUrl: "https://www.pfrda.org.in/circulars/",
    topic: "eligibility",
    keywords: ["nri nps", "oci nps", "non-resident nps", "tier1 nri", "fema nps", "nre account nps", "nro account nps", "nri eligibility", "oci eligibility", "can nri open nps", "overseas citizen pension"],
    embedding_hint: "NRI NPS account rules. Can OCI holders open NPS? FEMA compliance for NPS contributions."
  },
  {
    id: "eligibility-govt-employee-mandatory",
    text: "All Central Government employees who joined service on or after January 1, 2004, are mandatorily covered under NPS, replacing the Old Pension Scheme (OPS). The employee contributes 10% of basic pay plus DA, and the government contributes 14% of basic pay plus DA to the employee's Tier I account. State government employees are also covered under NPS in most states, though enrollment dates vary by state. Defence personnel are exempt in some cases. Auto-enrollment means no separate registration is required for new government joiners.",
    textHindi: "2004 ke baad join karne wale sarkaari karmchari NPS mein auto-enrolled hote hain. 10% employee + 14% employer contribution hota hai.",
    source: "PFRDA Notification",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "eligibility",
    keywords: ["government employee nps", "central government pension", "nps mandatory", "auto-enrolled nps", "new pension scheme 2004", "old pension scheme vs nps", "ops vs nps", "state government nps", "employer contribution govt", "10% 14% contribution", "defence nps"],
    embedding_hint: "Is NPS mandatory for government employees? Government employee NPS contribution percentage."
  },
  {
    id: "eligibility-private-sector-voluntary",
    text: "Private sector employees and self-employed individuals can voluntarily enroll in NPS. Enrollment can be done online through the eNPS portal at enps.nsdl.com using Aadhaar OTP for a fully paperless process, or through a registered Point of Presence (PoP) agent such as a bank branch. Employers in the private sector may optionally contribute to their employees' NPS, in which case the employer's contribution qualifies for deduction under Section 80CCD(2). Self-employed individuals can contribute based on gross income. There is no restriction on profession or income level for voluntary enrollment.",
    textHindi: "Niji sector ke log eNPS portal ya PoP agent ke zariye NPS join kar sakte hain. Self-employed bhi join kar sakte hain.",
    source: "PFRDA Guidelines",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "eligibility",
    keywords: ["private sector nps", "voluntary nps", "self employed nps", "enps portal", "pop agent", "how to join nps", "nps registration", "online nps enrollment", "nps for salaried", "nps for business owner", "nps for freelancer"],
    embedding_hint: "How can private sector employees join NPS? How to enroll in NPS online? Can self-employed join NPS?"
  },
  {
    id: "eligibility-minimum-contribution",
    text: "For NPS Tier I, the minimum contribution per transaction is Rs. 500. The minimum annual contribution required to keep the account active is Rs. 1,000 per financial year. If the annual minimum is not met, the account becomes dormant and a penalty of Rs. 100 per year of default is charged at reactivation. There is no maximum limit on contributions to NPS. For Tier II accounts, the minimum initial contribution is Rs. 1,000 and subsequent contributions must be at least Rs. 250. Contributions can be made anytime — monthly, quarterly, or lump sum. There is no fixed SIP date requirement for voluntary contributors.",
    textHindi: "Tier I mein har baar kam se kam Rs. 500 aur saalana kam se kam Rs. 1,000 dena zaroori hai. Maximum limit nahi hai.",
    source: "PFRDA Rules",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "eligibility",
    keywords: ["minimum contribution nps", "nps minimum 500", "nps annual minimum 1000", "nps account dormant", "nps penalty", "no maximum limit nps", "tier2 minimum contribution 250", "how much to invest in nps"],
    embedding_hint: "What is the minimum contribution for NPS? Maximum NPS contribution limit. NPS account dormant rules."
  },

  // ─────────────────────────────────────────────
  // TAX BENEFITS
  // ─────────────────────────────────────────────
  {
    id: "tax-80ccd1-own-contribution",
    text: "Section 80CCD(1) of the Income Tax Act provides a tax deduction on your own NPS contribution. For salaried employees, the deduction is limited to 10% of salary (Basic + DA). For self-employed individuals, it is 20% of gross total income. This deduction falls within the overall ceiling of Rs. 1.5 lakh per year under Section 80C. If you have already used your Rs. 1.5 lakh limit through PPF, ELSS, life insurance premium, or other 80C instruments, the 80CCD(1) benefit is effectively exhausted. NPS contribution under 80CCD(1) does not give extra room beyond 1.5 lakh on its own.",
    textHindi: "Section 80CCD(1) ke tahat apna NPS contribution: salaried ke liye 10% salary, self-employed ke liye 20% gross income. Ye Rs. 1.5 lakh ke 80C limit ke andar aata hai.",
    source: "Income Tax Act",
    sourceUrl: "https://www.incometaxindia.gov.in/",
    topic: "tax",
    keywords: ["80ccd1", "section 80ccd", "own contribution deduction", "nps tax benefit", "10% salary deduction", "self employed nps deduction", "20% gross income", "80c limit nps", "1.5 lakh nps", "nps deduction salaried"],
    embedding_hint: "NPS tax deduction under 80CCD(1). How much deduction on own NPS contribution? NPS within 80C limit."
  },
  {
    id: "tax-80ccd1b-extra-50000",
    text: "Section 80CCD(1B) is the most powerful NPS tax benefit. It allows an ADDITIONAL deduction of up to Rs. 50,000 per year for NPS contributions, completely OUTSIDE the Section 80C ceiling of Rs. 1.5 lakh. A taxpayer can claim a total deduction of Rs. 2 lakh (Rs. 1.5 lakh under 80C + Rs. 50,000 under 80CCD(1B)) by investing in NPS. No other savings instrument — not PPF, not ELSS, not life insurance — qualifies for this exclusive Rs. 50,000 deduction. This benefit applies only to Tier I NPS contributions. It is NOT available under the New Tax Regime from FY 2023-24 onwards. Tax saving under 80CCD(1B): at 30% slab = Rs. 15,000 saved; at 20% slab = Rs. 10,000 saved; at 10% slab = Rs. 5,000 saved.",
    textHindi: "Section 80CCD(1B) ke tahat sirf NPS ke liye extra Rs. 50,000 deduction milta hai. Ye 80C ke Rs. 1.5 lakh se alag hai. 30% slab mein Rs. 15,000 tax bachta hai.",
    source: "Income Tax Act",
    sourceUrl: "https://www.incometaxindia.gov.in/",
    topic: "tax",
    keywords: ["80ccd1b", "extra deduction nps", "50000 nps deduction", "nps exclusive deduction", "over and above 80c", "2 lakh deduction nps", "nps tax saving 50000", "additional nps deduction", "tier1 tax benefit", "how much tax saved nps"],
    embedding_hint: "Extra Rs. 50,000 NPS tax deduction under 80CCD(1B). Total NPS tax benefit. How much tax can I save with NPS?"
  },
  {
    id: "tax-slab-wise-savings",
    text: "The actual tax saving from NPS contributions depends on the taxpayer's income tax slab. Here is a complete breakdown of NPS tax savings under the Old Tax Regime: Under Section 80CCD(1B) — Rs. 50,000 extra deduction: at 30% tax slab the saving is Rs. 15,000 per year; at 20% tax slab the saving is Rs. 10,000 per year; at 10% tax slab the saving is Rs. 5,000 per year. Under Section 80CCD(1) — Rs. 1.5 lakh within 80C (if not exhausted): at 30% slab = Rs. 45,000; at 20% slab = Rs. 30,000; at 10% slab = Rs. 15,000. Maximum total NPS tax saving for someone in 30% slab with full 80C + 80CCD(1B): Rs. 60,000 per year (Rs. 45,000 + Rs. 15,000). Add 4% health and education cess to get total savings including cess. Income above Rs. 10 lakh falls in 30% slab; Rs. 5–10 lakh in 20% slab; Rs. 2.5–5 lakh in 10% slab.",
    textHindi: "30% slab mein 80CCD(1B) se Rs. 15,000 bachta hai. 20% slab mein Rs. 10,000. 10% slab mein Rs. 5,000. 80C+80CCD(1B) mein 30% slab mein maximum Rs. 60,000 bach sakta hai.",
    source: "Income Tax Act + PFRDA",
    sourceUrl: "https://www.incometaxindia.gov.in/",
    topic: "tax",
    keywords: ["tax saving calculation nps", "nps 30% slab saving", "nps 20% slab saving", "nps 10% slab saving", "how much tax saved nps", "nps tax benefit calculation", "income tax slab nps", "nps rs 15000 tax saving", "nps rs 60000 max saving", "tax slab wise nps benefit"],
    embedding_hint: "How much tax do I save with NPS? NPS tax saving by income slab. Calculate NPS tax benefit."
  },
  {
    id: "tax-80ccd2-employer-contribution",
    text: "Section 80CCD(2) covers the employer's contribution to an employee's NPS Tier I account. For Central and State Government employees, the employer's NPS contribution is deductible up to 14% of basic salary + DA. For private sector employees, the deductible limit is 10% of basic salary + DA. This deduction is available to the employee — the employer's contribution is not treated as taxable income for the employee, up to the specified limit. This benefit is available under BOTH the Old Tax Regime AND the New Tax Regime — making it the only NPS-related tax benefit available in the new regime. Example: If basic salary is Rs. 50,000/month and employer contributes 10% = Rs. 5,000/month = Rs. 60,000/year deduction under 80CCD(2).",
    textHindi: "Section 80CCD(2) mein employer ka NPS contribution: sarkaari employees ke liye 14%, niji employees ke liye 10% basic+DA tak. Ye Old aur New Tax Regime dono mein milta hai.",
    source: "Income Tax Act",
    sourceUrl: "https://www.incometaxindia.gov.in/",
    topic: "tax",
    keywords: ["80ccd2", "employer contribution tax", "employer nps deduction", "14% government employer nps", "10% private employer nps", "new tax regime nps", "employer nps benefit", "nps corporate benefit", "only nps benefit new regime"],
    embedding_hint: "Employer NPS contribution tax benefit. Section 80CCD(2). NPS tax benefit in new tax regime."
  },
  {
    id: "tax-new-regime-impact",
    text: "Under the New Tax Regime (default from FY 2023-24), Section 80CCD(1B) deduction of Rs. 50,000 is NOT available. Section 80CCD(1) for own contribution is also NOT available under new regime. The ONLY NPS-related tax benefit available under the New Tax Regime is Section 80CCD(2) — the employer's contribution deduction (14% for government, 10% for private). Individuals in the new regime should factor this when deciding on NPS contributions. For those with no employer NPS contribution, NPS gives zero tax benefit under new regime. Old regime is generally better for NPS contributors — especially if annual income exceeds Rs. 7.5 lakh and employer does not contribute to NPS.",
    textHindi: "New Tax Regime mein 80CCD(1) aur 80CCD(1B) nahi milte. Sirf 80CCD(2) (employer contribution) milta hai. Apna contribution karne par new regime mein koi tax benefit nahi.",
    source: "Income Tax Act 2023",
    sourceUrl: "https://www.incometaxindia.gov.in/",
    topic: "tax",
    keywords: ["new tax regime nps", "nps new regime", "80ccd1b new regime", "nps deduction new regime", "nps tax benefit 2023", "new vs old regime nps", "no 50000 deduction new regime", "nps worth it new regime"],
    embedding_hint: "NPS tax benefit under new tax regime. Is 80CCD(1B) available in new tax regime? NPS in new vs old regime."
  },
  {
    id: "tax-maturity-withdrawal-rules",
    text: "At NPS maturity (age 60 or above), up to 60% of the total corpus can be withdrawn as a one-time lump sum — this entire amount is completely tax-free. No capital gains tax, no income tax on the 60% lump sum. The remaining 40% must mandatorily be used to purchase an annuity from a PFRDA-empanelled insurer. The annuity income (monthly pension) received is fully taxable as income from salary under the applicable slab. If the total corpus at maturity is Rs. 5 lakh or less, the subscriber may withdraw the full amount as lump sum without any annuity requirement. Example: Corpus Rs. 1 Cr — lump sum Rs. 60 lakh (tax-free), annuity Rs. 40 lakh (monthly pension = Rs. 40L × 6% / 12 = Rs. 20,000/month, taxable).",
    textHindi: "60+ par 60% corpus tax-free lumpsum nikal sakte hain. Baaki 40% annuity kharni padti hai jisme monthly pension milti hai aur wo taxable hai. Rs. 5 lakh ya kam corpus par poora lumpsum.",
    source: "PFRDA Withdrawal Rules + Income Tax Act",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "tax",
    keywords: ["nps maturity tax", "nps 60% tax free", "nps lumpsum tax free", "nps annuity taxable", "nps corpus withdrawal tax", "nps 40% annuity mandatory", "nps 5 lakh full withdrawal", "nps exit tax", "nps retirement tax treatment"],
    embedding_hint: "Is NPS maturity amount tax free? How is NPS taxed at withdrawal? 60% lump sum NPS tax exemption."
  },
  {
    id: "tax-annuity-income-taxable",
    text: "The monthly pension received from an annuity purchased at NPS maturity is fully taxable under the Income Tax Act. It is classified as Income from Salary or Income from Other Sources depending on individual status. Tax is computed based on the applicable income tax slab. There is no separate exemption for annuity income. Senior citizens (60+) benefit from higher basic exemption limit (Rs. 3 lakh) so small annuity amounts may fall below the taxable threshold. No TDS is deducted by the annuity provider if Form 15H is submitted. Planning the annuity amount carefully can minimize tax in retirement. If monthly pension is Rs. 20,000/month = Rs. 2.4 lakh/year — for senior citizen with no other income this falls below Rs. 3 lakh exemption limit, so zero tax.",
    textHindi: "Annuity income par puri tarah income tax lagta hai. Form 15H se TDS rok sakte hain. Senior citizen ko Rs. 3 lakh exemption milti hai.",
    source: "Income Tax Act",
    sourceUrl: "https://www.incometaxindia.gov.in/",
    topic: "tax",
    keywords: ["annuity income tax", "nps pension taxable", "annuity tax slab", "nps monthly pension tax", "form 15h annuity", "tds annuity nps", "senior citizen annuity tax", "nps retirement income tax", "is nps pension taxable"],
    embedding_hint: "Is NPS annuity income taxable? Tax on monthly pension from NPS. Senior citizen NPS pension tax."
  },
  {
    id: "tax-tds-form15g-15h",
    text: "No TDS is deducted on NPS withdrawals if the subscriber submits Form 15G (for non-senior citizens below 60) or Form 15H (for senior citizens aged 60 and above) to the annuity provider before withdrawal. Form 15G or 15H is a self-declaration that total income does not exceed the taxable threshold. If TDS has already been deducted, it can be claimed as refund when filing the annual Income Tax Return (ITR). Even if TDS is not deducted, withdrawal income must be declared in ITR and tax paid if total income exceeds exemption limit.",
    textHindi: "NPS nikalne par TDS nahi kataa jata agar Form 15G (60 se kam) ya Form 15H (senior citizen) submit kar diya jaye.",
    source: "PFRDA TDS Rules",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "tax",
    keywords: ["tds nps", "form 15g nps", "form 15h nps", "no tds withdrawal", "nps tds exemption", "tds on nps withdrawal", "avoid tds nps", "nps tds refund"],
    embedding_hint: "How to avoid TDS on NPS withdrawal. Form 15G 15H for NPS. TDS rules for NPS withdrawal."
  },

  // ─────────────────────────────────────────────
  // WITHDRAWAL
  // ─────────────────────────────────────────────
  {
    id: "withdrawal-tier1-lock-in",
    text: "NPS Tier I is a long-term pension account with a lock-in until age 60. No regular withdrawal is permitted before age 60. Two exceptions exist: (1) partial withdrawal under specific circumstances after 3 years of account opening, and (2) premature exit under exceptional cases. The lock-in makes NPS distinct from mutual funds or FDs, and reinforces its purpose as a retirement vehicle.",
    textHindi: "Tier I ka paisa 60 saal tak lock rehta hai. Sirf partial withdrawal (3 saal baad, specific reasons) ya premature exit allowed hai.",
    source: "PFRDA Withdrawal Guidelines",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "withdrawal",
    keywords: ["tier1 lock in", "nps locked until 60", "nps no withdrawal before 60", "nps withdrawal age", "nps withdrawal restriction", "nps early exit", "when can i withdraw nps"],
    embedding_hint: "When can I withdraw from NPS? NPS lock-in period. Can I withdraw NPS before 60?"
  },
  {
    id: "withdrawal-partial-rules",
    text: "Partial withdrawal from NPS Tier I is permitted after completing 3 years of account opening. Conditions: (1) Maximum 25% of OWN contributions only — employer contributions and returns are excluded. (2) Allowed maximum 3 times during the entire NPS tenure. (3) Must be for PFRDA-approved reasons: higher education, children's marriage, first home purchase, critical illness treatment, disability, or startup activity. Partial withdrawal amounts are completely tax-free. No annuity purchase required. Example: If you contributed Rs. 3 lakh over 3 years, you can withdraw up to Rs. 75,000 (25% of own contributions).",
    textHindi: "3 saal baad aur valid reason ke saath partial withdrawal kar sakte hain. Sirf apna 25% contribution nikal sakte hain. Poori zindagi mein sirf 3 baar allowed hai. Amount tax-free hota hai.",
    source: "PFRDA Partial Withdrawal Rules",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "withdrawal",
    keywords: ["partial withdrawal nps", "nps 25% own contribution", "nps 3 times withdrawal", "partial withdrawal conditions", "nps withdrawal education", "nps withdrawal marriage", "nps withdrawal home", "nps withdrawal illness", "nps partial withdrawal tax free"],
    embedding_hint: "NPS partial withdrawal rules. Can I withdraw partial amount from NPS before 60?"
  },
  {
    id: "withdrawal-valid-reasons",
    text: "PFRDA-specified valid reasons for partial withdrawal from NPS Tier I before maturity: (1) Higher education of the subscriber or children, including skill development courses. (2) Marriage of the subscriber's children. (3) Purchase or construction of first residential home — not applicable if subscriber already owns property. (4) Treatment of specified critical illnesses: cancer, kidney failure, heart surgery, stroke, coma, organ transplant etc., for self or immediate family. (5) Permanent disability due to accident or illness. (6) Setting up a new business or startup. Proof of the specific reason must be submitted to the PoP or CRA when applying.",
    textHindi: "Valid reasons: padhai, bacchon ka vivah, pehla ghar khareedna, gambhir bimari, vikalangta, ya nayi company kholna. Sabut dena hoga.",
    source: "PFRDA Withdrawal Conditions",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "withdrawal",
    keywords: ["nps withdrawal reasons", "valid reasons nps withdrawal", "nps education withdrawal", "nps marriage withdrawal", "nps home loan withdrawal", "nps critical illness withdrawal", "nps disability withdrawal", "nps startup withdrawal"],
    embedding_hint: "What are valid reasons to withdraw from NPS? NPS withdrawal for medical emergency. NPS for home purchase."
  },
  {
    id: "withdrawal-exit-at-60",
    text: "When a subscriber reaches age 60, they can initiate the NPS exit process. At exit: minimum 40% of total corpus must be used to purchase an annuity from a PFRDA-empanelled insurance company. The remaining up to 60% can be withdrawn as one-time tax-free lump sum. If corpus is Rs. 5 lakh or below, subscriber may withdraw full amount without annuity. Subscriber can defer lump sum or annuity purchase by up to 3 years (until age 63) while staying invested. Exit initiated through the CRA portal (npscra.nsdl.co.in) or through the PoP. Example: Corpus Rs. 2 Cr — lump sum Rs. 1.2 Cr (tax-free), annuity Rs. 80 lakh, monthly pension Rs. 80L × 6% / 12 = Rs. 40,000/month.",
    textHindi: "60 par minimum 40% annuity kharni padti hai aur maximum 60% tax-free lumpsum nikal sakte hain. Rs. 5 lakh ya kam corpus par poora lumpsum. 63 saal tak defer kar sakte hain.",
    source: "PFRDA Exit Rules",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "withdrawal",
    keywords: ["nps exit at 60", "nps 60% lumpsum", "nps 40% annuity mandatory", "nps maturity exit", "nps 5 lakh full withdrawal", "nps retirement exit", "nps exit process", "nps defer withdrawal", "nps superannuation"],
    embedding_hint: "How to exit NPS at 60. NPS maturity withdrawal rules. 60% lump sum 40% annuity NPS."
  },
  {
    id: "withdrawal-premature-exit-before-60",
    text: "If a subscriber exits NPS before age 60 (premature exit): minimum 80% of total corpus must be used to purchase an annuity. Only 20% can be taken as lump sum. This applies to voluntary exit. Premature exit is only allowed after completing at least 5 years of NPS membership. If corpus is Rs. 2.5 lakh or below, subscriber may withdraw full amount without annuity. The 20% lump sum in premature exit is taxable — unlike the 60% tax-free lump sum at age 60. Example: Corpus Rs. 10 lakh, premature exit — annuity Rs. 8 lakh, lump sum Rs. 2 lakh (taxable). Vs. at 60: lump sum Rs. 6 lakh (tax-free), annuity Rs. 4 lakh.",
    textHindi: "60 se pehle nikalna ho to 80% annuity mein lagana padta hai, sirf 20% lumpsum milta hai. 5 saal ki membership zaroori hai. 20% lumpsum taxable hota hai.",
    source: "PFRDA Premature Exit Rules",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "withdrawal",
    keywords: ["premature exit nps", "nps before 60 withdrawal", "nps early exit rules", "80% annuity premature", "20% lumpsum premature nps", "nps 5 year minimum", "nps 2.5 lakh premature", "nps early retirement"],
    embedding_hint: "NPS withdrawal before age 60. Premature exit NPS rules. Can I exit NPS before retirement?"
  },

  // ─────────────────────────────────────────────
  // FUND PERFORMANCE & RETURNS
  // ─────────────────────────────────────────────
  {
    id: "returns-historical-fund-performance",
    text: "NPS fund returns are market-linked and vary by asset class and fund manager. Historical average annual returns (approximate, as of 2024): Equity (Asset Class E) — 10% to 14% over long term (10+ years), with top performers like SBI and HDFC Pension Fund delivering around 13-14% CAGR over 10 years. Corporate Bonds (Asset Class C) — 8% to 10% annually. Government Securities (Asset Class G) — 7% to 9% annually. Alternative Assets (Asset Class A) — 9% to 11% but limited to 5% of corpus. Overall blended return for a Moderate profile (50% E, 30% C, 20% G) is approximately 10% to 11% annually over long term. Returns fluctuate year to year — equity can give 18%+ in bull years and -5% in bear years. NPS returns are NOT guaranteed unlike EPF or PPF.",
    textHindi: "NPS returns market-linked hain. Equity (E): 10-14% long term. Corporate bonds (C): 8-10%. Govt securities (G): 7-9%. Moderate profile blended return approx 10-11% per year. Returns guaranteed nahi hain.",
    source: "PFRDA Annual Report 2024 + NPS Trust",
    sourceUrl: "https://www.npstrust.org.in/",
    topic: "returns",
    keywords: ["nps returns", "nps fund performance", "nps equity returns", "nps historical returns", "nps 10% return", "nps asset class returns", "nps sbi fund return", "nps hdfc fund return", "nps vs epf returns", "nps cagr", "nps long term returns"],
    embedding_hint: "What returns does NPS give? NPS historical fund performance. NPS equity returns. Best NPS fund performance."
  },
  {
    id: "returns-fund-manager-comparison",
    text: "Among PFRDA-approved NPS fund managers, historical equity (Class E) performance comparison over 10 years (approximate CAGR as of 2024): SBI Pension Fund — approximately 13.5% CAGR; HDFC Pension Fund — approximately 14% CAGR (consistently top performer); ICICI Prudential Pension Fund — approximately 13% CAGR; Kotak Mahindra Pension Fund — approximately 12.8% CAGR; UTI Retirement Solutions — approximately 12.5% CAGR; Aditya Birla Sun Life Pension — approximately 12.3% CAGR; Max Life Pension Fund — approximately 12% CAGR; LIC Pension Fund — approximately 11.5% CAGR (more conservative). Subscribers can switch fund manager once per year at no cost. For younger investors (below 40) with aggressive or moderate risk profile, HDFC and SBI equity funds have shown the strongest long-term results. These are approximate indicative figures — always check current NPS Trust website for latest NAV data.",
    textHindi: "HDFC Pension Fund equity mein approx 14% CAGR (top performer). SBI approx 13.5%. LIC sabse conservative approx 11.5%. Saal mein ek baar free mein fund manager change kar sakte hain.",
    source: "NPS Trust Performance Data 2024",
    sourceUrl: "https://www.npstrust.org.in/",
    topic: "returns",
    keywords: ["best nps fund manager", "hdfc pension fund returns", "sbi pension fund returns", "nps fund comparison", "nps fund manager performance", "nps switch fund manager", "nps top performing fund", "icici nps fund", "kotak nps fund", "uti nps fund", "nps fund ranking"],
    embedding_hint: "Best NPS fund manager. NPS fund manager comparison. Which fund manager is best for NPS equity?"
  },
  {
    id: "returns-corpus-projection-examples",
    text: "NPS corpus projection examples assuming 10% annual return (compounded monthly): Starting at age 25, contributing Rs. 5,000/month until age 60 (35 years): projected corpus approximately Rs. 1.89 Cr. Starting at age 25, contributing Rs. 10,000/month until age 60: approximately Rs. 3.78 Cr. Starting at age 25, contributing Rs. 20,000/month until age 60: approximately Rs. 7.56 Cr. Starting at age 30, contributing Rs. 10,000/month until age 60 (30 years): approximately Rs. 2.26 Cr. Starting at age 35, contributing Rs. 10,000/month until age 60 (25 years): approximately Rs. 1.33 Cr. Starting at age 40, contributing Rs. 10,000/month until age 60 (20 years): approximately Rs. 76 lakh. These projections use simple SIP formula and do not account for annual contribution increases. With 8% annual contribution increase, the corpus would be significantly higher — approximately 40-60% more than the flat SIP projection.",
    textHindi: "25 saal se Rs. 10,000/month, 10% return, 60 tak: approx Rs. 3.78 Cr. 30 saal se same: approx Rs. 2.26 Cr. 35 saal se: approx Rs. 1.33 Cr. Jitna jaldi shuru karo utna zyada corpus.",
    source: "NPS Financial Projection Model",
    sourceUrl: "https://www.npstrust.org.in/",
    topic: "returns",
    keywords: ["nps corpus projection", "nps returns calculation", "nps 10000 per month returns", "nps corpus at 60", "nps sip calculator", "nps retirement corpus", "nps 35 years contribution", "nps compounding", "nps how much corpus", "nps 5000 per month"],
    embedding_hint: "NPS corpus projection. How much corpus will I get from NPS? NPS SIP returns calculation example."
  },
  {
    id: "returns-power-of-starting-early",
    text: "The difference in NPS corpus between starting at 25 vs 35 is dramatic due to compounding. Example at Rs. 10,000/month SIP and 10% return: Age 25 start = Rs. 3.78 Cr by 60 (35 years). Age 30 start = Rs. 2.26 Cr by 60 (30 years). Age 35 start = Rs. 1.33 Cr by 60 (25 years). Age 40 start = Rs. 76 lakh by 60 (20 years). Starting 10 years early (25 vs 35) produces nearly 3x the corpus on the same monthly contribution. Each year of delay costs approximately 10-12% of final corpus at a 10% return rate. The first 10 years of contributions account for only 15-20% of total money contributed but generate 40-50% of total corpus through compounding.",
    textHindi: "25 saal se shuru karne par 35 saal se shuru karne se lagbhag 3 guna zyada corpus milta hai. Compounding ki wajah se jaldi shuru karna bahut important hai.",
    source: "NPS Compounding Analysis",
    sourceUrl: "https://www.npstrust.org.in/",
    topic: "returns",
    keywords: ["nps early start benefit", "nps compounding power", "nps age 25 vs 35", "start nps early", "nps delay cost", "nps compounding example", "nps early investment", "nps benefit of early start"],
    embedding_hint: "Why start NPS early? Power of compounding in NPS. How much does delaying NPS cost?"
  },

  // ─────────────────────────────────────────────
  // GOAL PLANNING & SIP CALCULATIONS
  // ─────────────────────────────────────────────
  {
    id: "goal-planning-sip-formula",
    text: "To calculate the monthly SIP required to reach a target NPS corpus, use the Future Value of SIP formula: FV = P × ((1 + r)^n − 1) / r, where P = monthly contribution, r = monthly return rate (annual rate / 12), n = number of months. Rearranged for required SIP: P = FV × r / ((1 + r)^n − 1). Example: Target Rs. 5 Cr by age 60, current age 30, return 10% per year. n = 30 × 12 = 360 months. r = 10% / 12 = 0.833% per month. Required SIP = 5,00,00,000 × 0.00833 / ((1.00833)^360 - 1) = Rs. 26,100 approximately. If current age is 25: required SIP = approximately Rs. 15,800/month. If current age is 35: required SIP = approximately Rs. 44,600/month. Starting 5 years earlier reduces required SIP by nearly 40%.",
    textHindi: "Rs. 5 Cr target ke liye: 30 saal ki umar se Rs. 26,100/month chahiye (10% return). 25 saal se Rs. 15,800/month. 35 saal se Rs. 44,600/month. Jitna jaldi shuru, utna kam SIP lagega.",
    source: "NPS Financial Planning Model",
    sourceUrl: "https://www.npstrust.org.in/",
    topic: "goal_planning",
    keywords: ["nps sip required", "nps target corpus sip", "nps how much to invest", "nps 5 crore target", "nps monthly contribution required", "nps goal planning", "nps sip formula", "nps required investment", "nps 1 crore sip", "nps 2 crore sip"],
    embedding_hint: "How much SIP do I need for NPS target corpus? Required monthly investment for NPS goal. NPS 5 crore target calculation."
  },
  {
    id: "goal-planning-early-retirement",
    text: "Early retirement with NPS requires significantly higher monthly contributions because: (1) Fewer years to accumulate corpus. (2) If exit is before 60, premature exit rules apply — 80% goes to annuity, 20% lump sum (taxable). (3) Longer retirement period means the corpus must support more years. NPS does not allow premature exit before 5 years of membership. Example — target Rs. 2 Cr by age 50, current age 30, return 10%: Required SIP = approximately Rs. 30,300/month. Vs. same corpus by age 60: requires only Rs. 8,700/month. Retiring at 50 requires 3.5x higher SIP than retiring at 60 for the same corpus. If planning early retirement, consider supplementing NPS with mutual funds (no lock-in, more flexibility) for liquidity before age 60.",
    textHindi: "Early retirement ke liye bahut zyada SIP chahiye. 50 saal mein Rs. 2 Cr ke liye Rs. 30,300/month chahiye (30 saal ki umar se). 60 saal mein same corpus ke liye sirf Rs. 8,700/month.",
    source: "NPS Early Retirement Planning",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "goal_planning",
    keywords: ["nps early retirement", "retire at 50 nps", "retire at 45 nps", "early retirement nps calculation", "nps before 60 planning", "nps retire early sip", "nps premature exit planning", "retire early india nps"],
    embedding_hint: "How to retire early with NPS? NPS early retirement planning. Required SIP to retire at 50 with NPS."
  },
  {
    id: "goal-planning-pension-target",
    text: "To calculate the target corpus needed for a desired monthly pension: Target Corpus = (Desired Monthly Pension × 12) / Annuity Rate / 0.40. The 0.40 accounts for the fact that only 40% of corpus goes to annuity at age 60. Example: Desired pension Rs. 50,000/month. Annuity rate 6%. Annuity needed = Rs. 50,000 × 12 / 6% = Rs. 1 Cr. Total corpus needed = Rs. 1 Cr / 0.40 = Rs. 2.5 Cr. For Rs. 1 lakh/month pension: annuity = Rs. 2 Cr, total corpus = Rs. 5 Cr. For Rs. 25,000/month pension: total corpus needed = Rs. 1.25 Cr. These calculations assume 6% annuity rate — actual rates vary by insurer and plan type between 5% to 7.5%.",
    textHindi: "Rs. 50,000/month pension chahiye to Rs. 2.5 Cr corpus chahiye (6% annuity rate). Rs. 1 lakh/month ke liye Rs. 5 Cr corpus chahiye.",
    source: "NPS Pension Planning Model",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "goal_planning",
    keywords: ["nps pension target", "nps desired pension corpus", "nps 50000 pension", "nps 1 lakh pension", "nps pension planning", "how much corpus for pension", "nps monthly pension target", "nps annuity corpus calculation"],
    embedding_hint: "How much corpus do I need for desired pension? NPS target corpus for monthly pension. NPS pension goal planning."
  },

  // ─────────────────────────────────────────────
  // NPS vs OTHER INSTRUMENTS
  // ─────────────────────────────────────────────
  {
    id: "nps-vs-ppf-comparison",
    text: "NPS vs PPF (Public Provident Fund) comparison: Lock-in — PPF has 15-year lock-in with partial withdrawal from year 7; NPS locked until age 60. Returns — PPF offers government-declared fixed rate (currently 7.1% for 2024); NPS is market-linked, historically 10-14% for equity. Tax treatment — PPF is fully EEE (Exempt-Exempt-Exempt): investment tax-free, returns tax-free, withdrawal tax-free; NPS is EET for 40% corpus (annuity income taxable). Maximum investment — PPF maximum Rs. 1.5 lakh/year; NPS has no upper limit. Tax deduction — both qualify under 80C up to Rs. 1.5 lakh; NPS additionally offers Rs. 50,000 under 80CCD(1B) which PPF does not. Returns potential — NPS equity has much higher long-term return potential. For someone in 30% tax bracket, NPS + PPF together maximizes tax savings. PPF better for capital safety; NPS better for higher long-term returns.",
    textHindi: "PPF: fixed return 7.1%, fully tax-free (EEE), Rs. 1.5 lakh limit. NPS: market-linked 10-14% equity, 60% tax-free at exit, extra Rs. 50,000 80CCD(1B). NPS zyada returns deta hai, PPF safe hai.",
    source: "Income Tax Act + RBI PPF Rules",
    sourceUrl: "https://www.incometaxindia.gov.in/",
    topic: "comparison",
    keywords: ["nps vs ppf", "ppf or nps which is better", "ppf nps difference", "ppf 7.1% vs nps returns", "nps ppf tax comparison", "ppf eee nps eet", "ppf maximum limit vs nps", "nps vs ppf for retirement", "ppf vs nps 2024"],
    embedding_hint: "NPS vs PPF comparison. Which is better NPS or PPF? NPS PPF tax difference. PPF vs NPS returns."
  },
  {
    id: "nps-vs-elss-comparison",
    text: "NPS vs ELSS (Equity Linked Savings Scheme) comparison: Lock-in — ELSS has only 3-year lock-in (shortest among 80C instruments); NPS locked until 60. Returns — ELSS historically 12-15% CAGR over long term; NPS equity also 12-14%. Tax on investment — both qualify for 80C deduction up to Rs. 1.5 lakh; NPS additionally offers 80CCD(1B) Rs. 50,000 which ELSS does not. Tax on returns — ELSS: LTCG (Long Term Capital Gains) of 10% on gains above Rs. 1 lakh per year; NPS equity returns within NPS are not separately taxed — only annuity income taxed at maturity. Flexibility — ELSS can be redeemed after 3 years any time; NPS locked until 60. Best strategy: use both — ELSS for 80C and liquidity, NPS for 80CCD(1B) extra Rs. 50,000 deduction and for disciplined long-term retirement saving.",
    textHindi: "ELSS: 3 saal lock-in, 12-15% returns, LTCG 10% on withdrawal. NPS equity: 12-14% returns, 60 tak lock-in, 40% corpus taxable. ELSS zyada liquid hai, NPS mein extra 80CCD(1B) benefit hai.",
    source: "Income Tax Act + SEBI ELSS Rules",
    sourceUrl: "https://www.incometaxindia.gov.in/",
    topic: "comparison",
    keywords: ["nps vs elss", "elss or nps which is better", "elss nps comparison", "elss 3 year lock in vs nps", "elss ltcg vs nps tax", "nps elss 80c", "elss nps returns comparison", "elss vs nps for tax saving", "nps elss strategy"],
    embedding_hint: "NPS vs ELSS comparison. Which is better ELSS or NPS? ELSS vs NPS tax and returns comparison."
  },
  {
    id: "epfo-vs-nps-comparison",
    text: "EPF (EPFO) vs NPS comparison: Applicability — EPF mandatory for employees earning basic salary up to Rs. 15,000; NPS mandatory for central/state govt employees, voluntary for private sector. Returns — EPF fixed rate declared by govt (8.25% for 2023-24); NPS market-linked (10-14% equity, 7-9% G-sec). Tax on withdrawal — EPF corpus fully tax-free after 5 years of service; NPS only 60% lump sum tax-free, 40% annuity income taxable. Tax deduction — both qualify under 80C; NPS additionally offers Rs. 50,000 under 80CCD(1B) that EPF does not. Employer contribution — EPF employer contributes 12% of basic; NPS government employer contributes 14%, private sector variable. Pension — EPF provides EPS (Employees Pension Scheme) for pension; NPS provides annuity. Best strategy: continue EPF (mandatory), also contribute to NPS voluntarily to use 80CCD(1B) Rs. 50,000 extra deduction.",
    textHindi: "EPF: fixed 8.25%, fully tax-free 5 saal baad. NPS: market-linked, sirf 60% tax-free, extra 80CCD(1B) Rs. 50,000 milta hai. Dono saath use karna best hai.",
    source: "EPFO + PFRDA Guidelines + Income Tax Act",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "comparison",
    keywords: ["epfo vs nps", "epf vs nps comparison", "epf nps difference", "epf fixed return vs nps", "epf tax free vs nps 60%", "nps epf together", "epf 8.25% vs nps returns", "should i choose nps or epf", "epf employer 12% vs nps 14%"],
    embedding_hint: "EPF vs NPS comparison. Which is better EPF or NPS? EPFO vs NPS returns and tax."
  },
  {
    id: "nps-vs-mutual-funds",
    text: "NPS vs Mutual Funds comparison: Lock-in — Mutual funds (except ELSS) have no lock-in, full liquidity; NPS locked until age 60. Returns — Mutual fund equity historically 12-16% CAGR long term; NPS equity 12-14%. Tax — Equity mutual fund LTCG taxed at 10% above Rs. 1 lakh on withdrawal; NPS: 60% lump sum tax-free, annuity taxable. Tax deduction — Mutual funds (except ELSS) give no 80C benefit; NPS gives 80C + 80CCD(1B) Rs. 50,000. Flexibility — Mutual funds can be withdrawn anytime; NPS rigid withdrawal rules. Cost — NPS has very low fund management charges (0.01-0.09% per year, among lowest globally); mutual funds 0.5-2% expense ratio. Best strategy: use NPS for tax benefits and retirement corpus (disciplined, low cost), use mutual funds for medium-term goals and liquidity. NPS is not a replacement for mutual funds — they serve different purposes.",
    textHindi: "Mutual funds liquid hain, NPS 60 tak locked. Mutual funds LTCG 10% taxable. NPS 60% tax-free. NPS charges bahut kam hain (0.01-0.09%). Dono alag purpose serve karte hain.",
    source: "SEBI + PFRDA Guidelines",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "comparison",
    keywords: ["nps vs mutual funds", "nps or mutual fund", "mutual fund vs nps returns", "nps vs sip mutual fund", "nps lock in vs mutual fund", "nps ltcg vs mutual fund", "nps charges vs mutual fund expense", "mutual fund nps together", "nps for retirement vs mutual fund"],
    embedding_hint: "NPS vs mutual funds comparison. Should I invest in NPS or mutual funds? NPS vs SIP in mutual funds."
  },

  // ─────────────────────────────────────────────
  // PROFESSION-SPECIFIC GUIDANCE
  // ─────────────────────────────────────────────
  {
    id: "nps-for-doctors-ca-professionals",
    text: "For self-employed professionals like doctors, chartered accountants (CA), lawyers, architects, and consultants: NPS is voluntary and provides the same tax benefits. Deduction under 80CCD(1) is 20% of gross total income (not salary-based like salaried employees). Under 80CCD(1B) the additional Rs. 50,000 deduction is available regardless of profession. For a doctor earning Rs. 30 lakh/year in 30% tax bracket: 80CCD(1) deduction = Rs. 6 lakh (20% of gross) but limited to 80C ceiling of Rs. 1.5 lakh. 80CCD(1B) = Rs. 50,000 additional. Total NPS-related deduction = Rs. 2 lakh. Tax saved = Rs. 60,000 (at 30% slab). Self-employed professionals with irregular income should note: NPS has no fixed SIP requirement — contribute when convenient, minimum Rs. 500 per transaction and Rs. 1,000 per year to keep active.",
    textHindi: "Doctor, CA jaise self-employed ke liye NPS deduction: 20% gross income (80CCD1 limit tak). Plus Rs. 50,000 extra 80CCD(1B). Rs. 30 lakh income par Rs. 60,000 tak tax bach sakta hai.",
    source: "Income Tax Act + PFRDA",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "profession",
    keywords: ["nps for doctors", "nps for ca", "nps for lawyers", "nps self employed professional", "nps consultant", "nps 20% gross income", "nps for freelancer india", "self employed nps tax benefit", "nps irregular income", "nps for business owners"],
    embedding_hint: "NPS for doctors, CA, lawyers, self-employed professionals. NPS tax benefit for self-employed. NPS for freelancers India."
  },
  {
    id: "nps-for-salaried-private-sector",
    text: "For salaried employees in private sector: If employer does not contribute to NPS — own contribution qualifies for 80CCD(1) up to 10% of basic salary within 80C limit of Rs. 1.5 lakh, plus 80CCD(1B) Rs. 50,000 additional. If employer contributes to NPS — employer's contribution qualifies for 80CCD(2) up to 10% of basic salary (no upper cap in rupee terms). Example: Salary Rs. 15 lakh/year, basic Rs. 7.5 lakh, employer contributes 10% to NPS = Rs. 75,000/year under 80CCD(2), own contribution Rs. 50,000 under 80CCD(1B). Total deduction = Rs. 1.25 lakh just from NPS. Tax saved at 30% = Rs. 37,500. Negotiate with employer to route part of CTC through NPS as it is tax-efficient for both employer and employee.",
    textHindi: "Private sector salaried: apna contribution 80CCD(1) + 80CCD(1B). Employer ka contribution 80CCD(2). Employer se NPS contribution negotiate karo — dono ke liye tax efficient hai.",
    source: "Income Tax Act + PFRDA",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "profession",
    keywords: ["nps salaried private sector", "nps employer private company", "nps negotiate employer", "nps salary restructure", "nps ctc restructuring", "80ccd2 private employer", "nps salary 15 lakh", "nps benefit salaried employee"],
    embedding_hint: "NPS for private sector salaried employees. NPS employer contribution private company. NPS salary restructuring."
  },
  {
    id: "nps-for-government-employees",
    text: "For Central Government employees (joined after January 1, 2004): NPS enrollment is automatic, PRAN generated by employer. Employee contributes 10% of basic + DA automatically deducted from salary. Government contributes 14% of basic + DA on employee's behalf. Both contributions qualify for deduction: employee's own 10% under 80CCD(1), employer's 14% under 80CCD(2) (no upper cap for govt). Employee can additionally contribute voluntary Rs. 50,000 under 80CCD(1B) for extra tax saving. State government employees have similar structure but contribution percentages may vary by state (most states follow 10% + 14% structure). Government employees under NPS do not get the old defined benefit pension — but the higher 14% employer contribution partially compensates. Fund choice and asset allocation options are same as for voluntary subscribers.",
    textHindi: "Sarkaari karmchari: 10% apna + 14% employer automatic deduct. Plus Rs. 50,000 extra voluntary 80CCD(1B) de sakte hain. Old pension scheme nahi milti NPS walon ko.",
    source: "PFRDA Government Employee Guidelines",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "profession",
    keywords: ["nps government employee", "central govt nps", "state govt nps", "nps 10% 14% contribution", "govt employee pension nps", "nps auto deduction salary", "nps ops vs nps govt", "nps voluntary contribution govt employee"],
    embedding_hint: "NPS for central government employees. Government employee NPS contribution rules. NPS vs old pension scheme government."
  },

  // ─────────────────────────────────────────────
  // ASSET ALLOCATION & FUND STRATEGY
  // ─────────────────────────────────────────────
  {
    id: "asset-allocation-by-age-risk",
    text: "Recommended NPS asset allocation by age and risk profile: Age below 35 — Aggressive: 75% Equity (E), 15% Corporate Bonds (C), 10% Govt Securities (G). Age below 35 — Moderate: 60% E, 25% C, 15% G. Age below 35 — Conservative: 30% E, 40% C, 30% G. Age 35-45 — Aggressive: 65% E, 20% C, 15% G. Age 35-45 — Moderate: 50% E, 30% C, 20% G. Age 35-45 — Conservative: 25% E, 40% C, 35% G. Age 45-55 — Moderate: 40% E, 35% C, 25% G. Age 45-55 — Conservative: 20% E, 40% C, 40% G. Age above 55 — reduce equity gradually towards 25-30% E, increase G to 40%+. NPS caps equity at maximum 75% — Tier I active choice. Auto Choice (Lifecycle Fund) automatically reduces equity as you age — good default for those who don't want to manage allocation manually.",
    textHindi: "35 saal se kam, moderate: 60% equity, 25% corporate bonds, 15% govt. 45-55 saal, moderate: 40% equity, 35% bonds, 25% govt. Umar badhne par equity kam karo. Auto Choice ye automatically karta hai.",
    source: "PFRDA Asset Allocation Guidelines",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "allocation",
    keywords: ["nps asset allocation", "nps equity percentage", "nps allocation by age", "nps moderate portfolio", "nps aggressive allocation", "nps conservative allocation", "nps auto choice vs active", "nps equity 75% max", "nps rebalancing", "nps lifecycle fund"],
    embedding_hint: "NPS asset allocation recommendation. NPS equity percentage by age. Active vs Auto choice NPS. NPS portfolio for moderate risk."
  },
  {
    id: "asset-allocation-switch-rules",
    text: "NPS subscribers on Active Choice can change their asset allocation (percentage between E, C, G, A) twice per financial year at no charge. Fund manager can be switched once per year at no charge. For rebalancing strategy: rebalance when equity allocation drifts more than 5% from target (e.g., if target is 60% equity but markets have pushed it to 67%, rebalance back to 60%). As you approach retirement (within 5 years of age 60), gradually reduce equity from say 50% to 25% over those 5 years to reduce sequence-of-returns risk. Sudden market fall just before retirement with high equity allocation can significantly impact the final corpus. Auto Choice (Lifecycle Fund) handles this reduction automatically based on preset age-based glide path.",
    textHindi: "Allocation saal mein 2 baar change kar sakte hain free mein. Fund manager saal mein ek baar switch free mein. Retirement se 5 saal pehle equity gradually kam karo risk reduce karne ke liye.",
    source: "PFRDA Switching Rules",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "allocation",
    keywords: ["nps allocation switch", "nps rebalancing", "nps change asset allocation", "nps switch fund manager free", "nps equity reduce before retirement", "nps lifecycle auto choice", "nps 2 times switch year", "nps sequence of returns risk"],
    embedding_hint: "How to change NPS asset allocation? NPS fund manager switch. NPS rebalancing strategy. NPS before retirement allocation."
  },

  // ─────────────────────────────────────────────
  // ANNUITY
  // ─────────────────────────────────────────────
  {
    id: "annuity-providers-types",
    text: "Annuity at NPS maturity must be purchased from PFRDA-empanelled insurance companies. Approved providers include: LIC of India, Bajaj Allianz Life, HDFC Life, ICICI Prudential Life, Max Life Insurance, Kotak Mahindra Life, SBI Life, Aditya Birla Sun Life, and others. Annuity plan types: (1) Life Annuity — pension until subscriber's death, nothing to nominee. (2) Life Annuity with Return of Purchase Price — pension until death, corpus returned to nominee on death (lower monthly pension but corpus preserved). (3) Joint Life Annuity — pension continues to spouse after subscriber's death at 50-100% of original amount. (4) Annuity with Guaranteed Period — pension paid for fixed period (5, 10, or 20 years) regardless of death. Compare rates across providers before purchasing — rates vary by 0.5-1% which on a Rs. 40 lakh annuity corpus translates to Rs. 2,000-4,000/month difference in pension.",
    textHindi: "Annuity LIC, HDFC Life, ICICI, SBI Life etc. se khareedni padti hai. Types: life annuity, joint life (spouse ko bhi), return of purchase price (corpus nominee ko). Compare karo — rate mein fark hota hai.",
    source: "PFRDA Annuity Rules",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "annuity",
    keywords: ["nps annuity provider", "pfrda approved annuity", "lic nps annuity", "hdfc life annuity", "icici annuity nps", "annuity types nps", "joint life annuity nps", "return of purchase price annuity", "nps pension plan", "best annuity nps", "annuity comparison nps"],
    embedding_hint: "Which companies provide NPS annuity? Types of annuity available in NPS. Best annuity plan for NPS."
  },
  {
    id: "annuity-rates-current",
    text: "Annuity rates in India for NPS (as of 2024) vary by provider, age, and plan type. Approximate annuity rates for a 60-year-old subscriber: Life Annuity (no return of corpus): 6.0% to 7.5% per annum. Life Annuity with Return of Purchase Price: 5.0% to 6.0% per annum (lower because corpus is returned to nominee). Joint Life Annuity: 5.5% to 6.5% per annum. Example with Rs. 40 lakh annuity corpus: At 6% rate — monthly pension = Rs. 40L × 6% / 12 = Rs. 20,000/month. At 7% rate — Rs. 23,333/month. At 5.5% rate (joint life) — Rs. 18,333/month. LIC typically offers 6.5-7% on simple life annuity. HDFC Life and ICICI Prudential offer competitive rates. Always get quotes from minimum 3 providers before purchasing. Annuity rates depend on prevailing interest rates in economy — when RBI repo rate is higher, annuity rates are higher.",
    textHindi: "2024 mein annuity rate: simple life annuity 6-7.5%. Return of purchase price 5-6%. Joint life 5.5-6.5%. Rs. 40 lakh annuity par 6% rate = Rs. 20,000/month pension. LIC 6.5-7% deta hai.",
    source: "PFRDA Annuity Rate Survey 2024",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "annuity",
    keywords: ["nps annuity rate 2024", "annuity rate india", "nps 6% annuity", "nps monthly pension calculation", "lic annuity rate nps", "annuity rate comparison", "nps annuity 40 lakh pension", "annuity rate by provider", "nps pension amount calculation"],
    embedding_hint: "Current NPS annuity rates. How much monthly pension from NPS annuity? NPS annuity rate 2024."
  },
  {
    id: "annuity-permanent-decision",
    text: "Once you purchase an annuity with NPS corpus, it is PERMANENT and IRREVOCABLE. You cannot change the annuity provider, plan type, or surrender the annuity after purchase. The monthly pension rate is fixed at purchase time. Because this is irreversible, compare rates across all PFRDA-approved providers before deciding. PFRDA allows up to 3 years to defer the annuity purchase after reaching age 60 — use this time to compare rates, consider spouse's needs, and choose the right plan. A joint life annuity costs more (lower monthly pension) but protects spouse's income. Return of Purchase Price annuity gives lower pension but preserves wealth for heirs. Simple life annuity gives highest monthly pension but nothing for nominee after death.",
    textHindi: "Ek baar annuity khareed lene ke baad change nahi kar sakte. 60 ke baad 3 saal tak compare karo. Joint life annuity spouse ko protect karti hai. Simple annuity highest pension deti hai par nominee ko kuch nahi.",
    source: "PFRDA Annuity Terms",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "annuity",
    keywords: ["annuity irrevocable nps", "nps annuity permanent", "cannot change annuity nps", "compare annuity nps", "defer annuity nps", "annuity decision nps", "joint vs simple annuity nps", "annuity 3 year defer nps"],
    embedding_hint: "Can I change NPS annuity after purchase? How to choose NPS annuity. NPS annuity comparison strategy."
  },

  // ─────────────────────────────────────────────
  // DEATH & NOMINEE
  // ─────────────────────────────────────────────
  {
    id: "death-nominee-corpus",
    text: "In the event of the NPS subscriber's death, the entire corpus (100%) is paid out to the registered nominee or legal heir as a tax-free lump sum. No annuity purchase required for nominee — they receive the full amount. This is a key advantage over subscriber's own exit rules where 40% must go to annuity. Nominee must submit death certificate, ID proof, and bank details to PoP or CRA to initiate claim. If no nominee registered, legal heirs must provide succession certificate. Claims processed within 30-45 working days typically.",
    textHindi: "Subscriber ki mrityu par nominee ko 100% corpus tax-free milta hai. Annuity kharni nahi padti. Death certificate, ID proof aur bank details dene padte hain.",
    source: "PFRDA Nominee Rules",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "death",
    keywords: ["nps death benefit", "nps nominee withdrawal", "nps subscriber death", "100% corpus nominee", "nps tax free death", "nps legal heir", "nps death claim", "nps no annuity nominee"],
    embedding_hint: "What happens to NPS when subscriber dies? NPS nominee claim process. NPS death benefit."
  },
  {
    id: "death-nominee-update",
    text: "Nominee details can be updated online via the CRA portal at npscra.nsdl.co.in using PRAN and IPIN. Multiple nominees can be added with specified percentage allocated to each. Changes reflected within 5-7 working days. For minor nominees, a guardian must be specified. Always ensure nominee's name matches their official ID documents to avoid claim disputes. Review nominee details after major life events like marriage, divorce, or having children.",
    textHindi: "CRA portal se PRAN aur IPIN ke zariye nominee update kar sakte ho. Multiple nominees add ho sakte hain. Update 5-7 din mein hota hai.",
    source: "PFRDA CRA Portal Guide",
    sourceUrl: "https://www.npscra.nsdl.co.in/",
    topic: "death",
    keywords: ["nps nominee update", "change nominee nps", "nps multiple nominees", "nominee percentage nps", "cra portal nominee", "nps nominee minor", "npscra nominee update"],
    embedding_hint: "How to add or change nominee in NPS. NPS nominee update online. Multiple nominees in NPS."
  },

  // ─────────────────────────────────────────────
  // TIER I vs TIER II
  // ─────────────────────────────────────────────
  {
    id: "tier-comparison-tier1-vs-tier2",
    text: "NPS Tier I vs Tier II: Tier I is the primary mandatory pension account locked until age 60. All tax benefits — 80CCD(1), 80CCD(1B), 80CCD(2) — apply only to Tier I. Must have Tier I before opening Tier II. Tier II is a voluntary, flexible savings account with no lock-in — withdraw anytime. Tier II provides no tax deduction for most taxpayers. Tier II functions like a mutual fund savings account; Tier I is a pure retirement instrument. Both share the same PRAN number. Tier II minimum initial contribution Rs. 1,000, subsequent Rs. 250. Tier II is useful for parking short-term savings with professional fund management at very low cost (0.01-0.09% charges).",
    textHindi: "Tier I mandatory pension account hai (60 tak locked). Tier II optional savings account hai (koi lock-in nahi). Tax benefit sirf Tier I par milta hai.",
    source: "PFRDA Tier Rules",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "tier",
    keywords: ["tier1 vs tier2 nps", "nps tier 1 tier 2 difference", "tier2 nps benefits", "tier2 nps withdrawal", "tier1 locked tier2 liquid", "nps tier2 tax benefit", "nps account types", "tier2 vs mutual fund"],
    embedding_hint: "Difference between NPS Tier 1 and Tier 2. NPS Tier 2 account rules. Should I open NPS Tier 2?"
  },
  {
    id: "tier-tier2-tax-benefit-exception",
    text: "Tier II NPS contributions do NOT qualify for tax deductions under 80CCD(1), 80CCD(1B), or 80C for most individuals. Exception: Central Government employees who contribute to Tier II with a lock-in of 3 years can claim deduction under Section 80C up to Rs. 1.5 lakh. This exception does NOT apply to state government employees, private sector, or self-employed. Returns in Tier II are treated as capital gains taxed based on fund type and holding period. Equity Tier II held less than 12 months: STCG at 20%. Equity Tier II held more than 12 months: LTCG at 12.5% above Rs. 1.25 lakh gain. Debt Tier II: taxed at slab rate regardless of holding period.",
    textHindi: "Tier II par tax benefit nahi milta aam logon ko. Central Govt employees 3-year lock-in ke saath 80C claim kar sakte hain. Equity LTCG 12.5%, STCG 20%.",
    source: "Income Tax Act + PFRDA",
    sourceUrl: "https://www.incometaxindia.gov.in/",
    topic: "tier",
    keywords: ["tier2 tax benefit nps", "tier2 80c deduction", "central government tier2 80c", "tier2 no tax benefit", "tier2 capital gains", "nps tier2 equity tax", "nps tier2 debt tax", "tier2 ltcg stcg", "tier2 lock in 3 years"],
    embedding_hint: "NPS Tier 2 tax benefits. Tier 2 capital gains tax. Central government Tier 2 deduction."
  },

  // ─────────────────────────────────────────────
  // PRAN
  // ─────────────────────────────────────────────
  {
    id: "pran-overview",
    text: "PRAN (Permanent Retirement Account Number) is a unique 12-digit identifier assigned to every NPS subscriber for life. One PRAN per person — cannot have more than one. If multiple PRANs accidentally opened, close duplicate immediately by contacting PoP or CRA. PRAN is portable across employers, cities, states, and sectors. PRAN serves both Tier I and Tier II under one number. PRAN issued within a few working days of eNPS registration. PRAN card serves as proof of NPS membership.",
    textHindi: "PRAN ek 12-ank ka unique number hai. Ek baar milta hai aur poori zindagi valid rehta hai. Multiple PRAN nahi khol sakte. Naukri badalne par bhi same PRAN rehta hai.",
    source: "PFRDA PRAN Documentation",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "pran",
    keywords: ["pran number", "what is pran", "pran nps", "12 digit pran", "one pran per person", "multiple pran not allowed", "pran portable", "pran across employers", "pran card"],
    embedding_hint: "What is PRAN in NPS? How is PRAN issued? Can I have two PRANs? PRAN portability."
  },
  {
    id: "pran-apply-online",
    text: "Apply for PRAN online at eNPS portal: enps.nsdl.com. Aadhaar-based paperless process: (1) Visit enps.nsdl.com, click New Registration. (2) Select Aadhaar for eKYC. (3) Enter Aadhaar number, verify via OTP. (4) Personal details auto-filled from UIDAI. (5) Fill bank account, nominee, fund manager, asset allocation. (6) Make initial contribution (min Rs. 500 for Tier I). (7) PRAN generated instantly, PRAN card sent to registered address. No physical form or bank visit needed for Aadhaar-based registration.",
    textHindi: "PRAN ke liye enps.nsdl.com par jao. Aadhaar OTP se verify karo. Details auto-fill hoti hain. Initial contribution karo aur PRAN turant generate ho jata hai.",
    source: "eNPS Portal Guide",
    sourceUrl: "https://enps.nsdl.com/",
    topic: "pran",
    keywords: ["apply pran online", "enps portal pran", "how to get pran", "pran registration steps", "aadhaar otp pran", "paperless pran registration", "nps online registration", "pran generation", "new pran application"],
    embedding_hint: "How to apply for PRAN online. NPS registration process. eNPS portal steps."
  },

  // ─────────────────────────────────────────────
  // DOCUMENTS & KYC
  // ─────────────────────────────────────────────
  {
    id: "documents-kyc-mandatory",
    text: "To open NPS account, mandatory KYC documents: (1) Identity Proof: Aadhaar card primary; PAN or passport if Aadhaar unavailable. (2) PAN Card: mandatory for all NPS accounts for tax reporting. (3) Bank Account Proof: cancelled cheque or first page of bank passbook with name, account number, IFSC, branch. (4) Photograph: recent passport-size color photo. For eNPS Aadhaar OTP registration, photograph captured digitally — no physical documents needed. For offline PoP registration, self-attested copies required.",
    textHindi: "NPS kholne ke liye: Aadhaar/PAN, PAN card, cancelled cheque ya passbook, aur photo zaroori hai. eNPS par Aadhaar OTP se sab digital ho jata hai.",
    source: "PFRDA KYC Rules",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "documents",
    keywords: ["nps kyc documents", "nps required documents", "aadhaar nps", "pan card nps", "cancelled cheque nps", "passbook nps", "photograph nps", "identity proof nps", "kyc nps online"],
    embedding_hint: "What documents are needed to open NPS account? KYC requirements for NPS."
  },

  // ─────────────────────────────────────────────
  // ACCOUNT ACCESS & MANAGEMENT
  // ─────────────────────────────────────────────
  {
    id: "account-balance-statement",
    text: "NPS subscribers can check balance, view transaction history, and download statements at the CRA portal: npscra.nsdl.co.in. Login with 12-digit PRAN and IPIN. The portal shows current NAV, unit balance in each asset class (E, C, G, A), total corpus value, contribution history, and fund performance. Annual Consolidated Account Statements (CAS) emailed to registered email. Statements accepted by Income Tax Department as 80CCD proof. IPIN forgotten — reset via OTP on the same portal.",
    textHindi: "NPS balance check karne ke liye npscra.nsdl.co.in par PRAN aur IPIN se login karo. NAV, contribution history, fund performance sab dekhne milta hai.",
    source: "NPS CRA Portal",
    sourceUrl: "https://www.npscra.nsdl.co.in/",
    topic: "account",
    keywords: ["nps balance check", "nps account statement", "npscra.nsdl.co.in", "pran ipin login", "nps transaction history", "nps nav check", "nps cas statement", "nps statement download", "nps portal login"],
    embedding_hint: "How to check NPS balance. NPS account statement download. NPS CRA portal login."
  },
  {
    id: "account-update-grievance",
    text: "NPS account details like bank account, nominee, mobile, email, and address can be updated online via CRA portal (npscra.nsdl.co.in) with PRAN and IPIN. Updates processed within 5-7 working days without physical forms. For grievances or complaints: 24/7 toll-free helpline 1800-222-080. Raise complaints online on CRA portal. For PRAN card reissue, apply through portal or PoP.",
    textHindi: "Bank, nominee, mobile, email — sab CRA portal se update kar sakte ho. Complaint ke liye 1800-222-080 (24/7 toll-free).",
    source: "NPS CRA Portal + PFRDA Support",
    sourceUrl: "https://www.npscra.nsdl.co.in/",
    topic: "account",
    keywords: ["nps update details", "nps change bank", "nps change nominee", "nps helpline 1800-222-080", "nps complaint", "nps grievance", "cra portal update", "nps ipin reset", "nps customer care"],
    embedding_hint: "NPS helpline number. How to update bank details in NPS. NPS complaint process."
  },

  // ─────────────────────────────────────────────
  // ENPS TROUBLESHOOTING
  // ─────────────────────────────────────────────
  {
    id: "enps-troubleshooting-common-issues",
    text: "Common eNPS issues and solutions: (1) Aadhaar OTP not received — check mobile number linked to Aadhaar at UIDAI; update mobile at nearest Aadhaar enrolment center if outdated. (2) PRAN not generated after payment — wait 2-3 working days; if not received, check registered email; contact 1800-222-080. (3) Contribution not reflecting in account — NPS contributions take 3-5 working days to reflect after payment; check transaction history on CRA portal with receipt number. (4) IPIN forgotten or locked — reset via OTP option on npscra.nsdl.co.in login page. (5) Name mismatch between Aadhaar and PAN — contact PoP agent for manual KYC; online enrollment requires exact name match. (6) Payment failure during registration — do not retry immediately; check bank statement before retrying to avoid duplicate payment. (7) Unable to login CRA portal — clear browser cache; use Chrome or Firefox; avoid Internet Explorer.",
    textHindi: "Aadhaar OTP nahi aaya: UIDAI se mobile number update karo. PRAN nahi aaya: 2-3 din wait karo, phir 1800-222-080 call karo. Contribution reflect nahi hua: 3-5 working days lagta hai.",
    source: "NPS CRA Helpdesk + eNPS FAQ",
    sourceUrl: "https://www.npscra.nsdl.co.in/",
    topic: "troubleshooting",
    keywords: ["enps otp not received", "pran not generated", "nps contribution not reflecting", "ipin forgot nps", "nps login problem", "name mismatch nps", "nps payment failed", "enps aadhaar problem", "nps account not opening", "nps technical issues"],
    embedding_hint: "NPS account not opening. eNPS OTP not received. PRAN not generated. NPS contribution not showing."
  },
  {
    id: "enps-contribution-methods",
    text: "How to make NPS contributions: (1) eNPS portal (enps.nsdl.com) — login with PRAN and IPIN, go to Contribution section, choose Tier I or Tier II, enter amount (min Rs. 500 for Tier I), pay via net banking, debit card, or UPI. (2) Employer payroll deduction — for salaried employees, authorize employer to deduct from salary. (3) PoP (Point of Presence) — visit any empanelled bank branch with contribution amount. (4) D-Remit (Direct Remittance) — set up automatic bank transfer using the Virtual Account Number provided in your PRAN account. D-Remit is most efficient for regular monthly SIP as it is automated and units are allocated same day at T+0 NAV. (5) SIP via netbanking — many banks allow NPS contribution via their internet banking. After contributing, always save the acknowledgment receipt for tax records.",
    textHindi: "NPS contribution kaise karein: eNPS portal, employer payroll, PoP bank, D-Remit (automatic transfer), ya netbanking se. D-Remit best hai regular SIP ke liye — same day NAV milta hai.",
    source: "eNPS Portal + PFRDA",
    sourceUrl: "https://enps.nsdl.com/",
    topic: "troubleshooting",
    keywords: ["how to contribute nps", "nps payment methods", "nps d-remit", "nps net banking contribution", "nps upi payment", "nps sip setup", "nps payroll deduction", "nps pop contribution", "nps automatic payment", "nps contribution online"],
    embedding_hint: "How to contribute to NPS online. NPS D-Remit setup. NPS SIP automatic payment. NPS contribution methods."
  },

  // ─────────────────────────────────────────────
  // WITHDRAWAL STRATEGIES
  // ─────────────────────────────────────────────
  {
    id: "withdrawal-strategy-optimal",
    text: "Optimal NPS withdrawal strategy at retirement (age 60+): (1) Do NOT rush to exit immediately at 60 — PFRDA allows staying invested until age 75. Corpus continues to earn market-linked returns. (2) Take the 60% lump sum tax-free withdrawal — this should ideally be invested in tax-efficient instruments for further growth (debt mutual funds, PPF top-up within limits, FDs). (3) For annuity — defer for up to 3 years post 60 to compare rates and make an informed choice. (4) Choose Joint Life Annuity if spouse has no independent income — protects both. (5) If corpus is small (below Rs. 50 lakh), consider taking full lump sum (if below Rs. 5 lakh threshold) or maximize lump sum to avoid taxable annuity income. (6) Senior Citizen Savings Scheme (SCSS) is a complementary product for the lump sum — up to Rs. 30 lakh at 8.2% (2024) with quarterly payout. (7) Plan lump sum withdrawal in a year with lower total income to minimize tax impact.",
    textHindi: "Retirement strategy: 60 par turant mat nikalo — 75 saal tak invested reh sakte ho. 60% lump sum tax-free lo aur invest karo. Annuity 3 saal defer karo to compare rates. Joint life annuity agar spouse ki koi income nahi.",
    source: "NPS Retirement Planning Framework",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "withdrawal_strategy",
    keywords: ["nps withdrawal strategy", "nps retirement planning", "nps 60% lump sum invest", "nps annuity defer", "nps stay invested after 60", "nps optimal exit strategy", "nps joint annuity spouse", "nps lump sum tax planning", "nps scss combination"],
    embedding_hint: "Best NPS withdrawal strategy at retirement. When to withdraw NPS. NPS lump sum investment strategy."
  },
  {
    id: "withdrawal-strategy-systematic",
    text: "NPS Systematic Lump Sum Withdrawal (SLW) — introduced by PFRDA: subscribers can opt to receive the 60% lump sum in installments (monthly, quarterly, annually) instead of one-time withdrawal. This is called SLW. Benefits: (1) Remaining corpus continues to earn returns while being drawn down. (2) Reduces lump sum investment management burden. (3) Provides steady cash flow supplementing annuity pension. (4) Tax benefit — spreading lump sum across years may keep annual income below higher tax slabs. SLW can be set up from age 60 onwards and can be stopped and full remaining lump sum taken at any time. Minimum SLW amount and frequency can be customized. This feature is particularly useful for subscribers with a large corpus (above Rs. 1 Cr) who want to avoid reinvestment risk of a one-time large lump sum.",
    textHindi: "NPS SLW (Systematic Lump Sum Withdrawal): 60% lump sum ko installments mein le sakte ho. Baaki corpus invest rehta hai. Tax bhi kam lagta hai kyunki income spread hoti hai. Rs. 1 Cr se zyada corpus walon ke liye useful.",
    source: "PFRDA SLW Circular 2023",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "withdrawal_strategy",
    keywords: ["nps slw", "nps systematic lump sum withdrawal", "nps installment withdrawal", "nps 60% in installments", "nps lump sum monthly", "nps phased withdrawal", "nps partial withdrawal after 60", "nps corpus drawdown"],
    embedding_hint: "NPS systematic lump sum withdrawal. NPS SLW feature. Can I withdraw NPS in installments?"
  },

  // ─────────────────────────────────────────────
  // RECENT RULE CHANGES (2023–2025)
  // ─────────────────────────────────────────────
  {
    id: "recent-changes-2023-2025",
    text: "Key NPS rule changes and updates from 2023-2025: (1) New Tax Regime made default from FY 2023-24 — 80CCD(1B) Rs. 50,000 deduction not available under new regime. 80CCD(2) still available. (2) 80CCD(2) limit for private sector employers increased in Budget 2024 — can now deduct up to 14% of salary (raised from 10%) — same as government employer. Check latest Finance Act for confirmation. (3) NPS SLW (Systematic Lump Sum Withdrawal) feature introduced — allows phased withdrawal of 60% lump sum corpus instead of one-time withdrawal. (4) Online partial withdrawal — subscribers can now initiate partial withdrawals fully online via CRA portal without visiting PoP. (5) UPI-based NPS contributions now available — making it easier to contribute via mobile. (6) Atal Pension Yojana (APY) — separate scheme for unorganized sector workers below age 40, government co-contributes under certain income conditions.",
    textHindi: "2023-25 changes: New regime default se 80CCD(1B) nahi milta. SLW feature aaya. Online partial withdrawal ab PoP gaye bina. UPI se contribution possible. 80CCD(2) private sector 14% tak badha.",
    source: "PFRDA Circulars + Budget 2024 + Finance Act",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "updates",
    keywords: ["nps rule change 2024", "nps 2024 update", "nps new tax regime 2023", "80ccd2 14% private 2024", "nps slw new feature", "nps online partial withdrawal", "nps upi contribution", "nps budget 2024 change", "nps latest news"],
    embedding_hint: "NPS rule changes 2024. Latest NPS updates. NPS budget 2024 changes. New NPS features."
  },

  // ─────────────────────────────────────────────
  // APY (ATAL PENSION YOJANA)
  // ─────────────────────────────────────────────
  {
    id: "apy-overview",
    text: "Atal Pension Yojana (APY) is a government-backed pension scheme for unorganized sector workers. Eligibility: Indian citizens aged 18-40 years, not income tax payers, with a savings bank account. The scheme provides a guaranteed monthly pension of Rs. 1,000 to Rs. 5,000 at age 60, based on contribution amount and age of joining. Government contributes 50% of subscriber's contribution or Rs. 1,000 per year (whichever is lower) for 5 years for those who joined between June 2015 to December 2015. Contribution is auto-debited from savings account monthly. Tax benefit: contributions qualify for deduction under 80CCD(1) up to Rs. 1.5 lakh within 80C. APY is separate from NPS — managed by PFRDA but different scheme. Exit before 60 results in return of contributions plus accrued returns.",
    textHindi: "APY unorganized sector ke liye hai. 18-40 saal ke non-income tax payers ke liye. Rs. 1,000 se Rs. 5,000/month guaranteed pension 60 par. NPS se alag scheme hai.",
    source: "PFRDA APY Guidelines",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "apy",
    keywords: ["atal pension yojana", "apy scheme", "apy vs nps", "apy eligibility", "apy pension amount", "apy contribution", "unorganized sector pension", "apy 5000 pension", "apy tax benefit", "apy government contribution"],
    embedding_hint: "What is Atal Pension Yojana? APY vs NPS. APY eligibility and pension amount."
  },

  // ─────────────────────────────────────────────
  // COMPREHENSIVE STRATEGY GUIDE
  // ─────────────────────────────────────────────
  {
    id: "strategy-maximize-nps-benefits",
    text: "Complete strategy to maximize NPS benefits: Step 1 — Open NPS Tier I immediately if not already done. Even a small Rs. 1,000/month contribution for 30 years at 10% return = Rs. 20 lakh. Step 2 — Contribute at least Rs. 50,000/year to Tier I to maximize 80CCD(1B) deduction. At 30% slab this saves Rs. 15,000/year. Step 3 — If employer offers NPS, request maximum employer contribution under 80CCD(2). Step 4 — Choose Active Choice with 75% equity if age below 40, moderate risk. Step 5 — Select high-performing fund manager (review annual performance). Step 6 — Increase contribution by at least 8-10% every year tracking income growth. Step 7 — At age 55, start gradually shifting equity allocation to 30-40%. Step 8 — At 60, compare annuity rates from all providers before purchasing. Consider SLW for lump sum. Step 9 — File ITR every year with NPS deduction details — keep CAS statements safe.",
    textHindi: "NPS maximize karne ke steps: Tier I kholo, Rs. 50,000 80CCD(1B) ke liye invest karo, employer contribution negotiate karo, 40 se kam mein 75% equity rakho, har saal contribution 8-10% badhao, 55 par equity kam karo, 60 par annuity compare karo.",
    source: "NPS Financial Planning Best Practices",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "strategy",
    keywords: ["maximize nps benefit", "nps strategy", "nps best practices", "nps step by step guide", "nps complete strategy", "nps how to invest", "nps planning guide", "nps tips", "nps 50000 80ccd1b strategy", "nps equity at young age"],
    embedding_hint: "How to maximize NPS benefits. NPS complete investment strategy. Best way to invest in NPS."
  },
  {
    id: "strategy-nps-combined-with-other",
    text: "Optimal retirement portfolio combining NPS with other instruments: Foundation (mandatory): EPF if employed — continue mandatory contributions. Core tax-saving layer: NPS Tier I Rs. 50,000/year minimum for exclusive 80CCD(1B) benefit. Then ELSS up to Rs. 1.5 lakh for 80C balance (if employer EPF does not exhaust 80C). Medium-term liquidity layer: PPF for tax-free long-term savings with liquidity from year 7. Equity mutual funds (index funds) for goals 5-15 years away with no lock-in. Emergency buffer: 6 months expenses in liquid fund or savings account — do NOT rely on NPS partial withdrawal for emergencies as it has restrictions. Insurance: Term life insurance 15-20x annual income; health insurance separate from employer cover. NPS is the long-term retirement lock-in portion — not a substitute for mutual funds for medium-term goals.",
    textHindi: "Best retirement portfolio: EPF (mandatory) + NPS Tier I Rs. 50,000 (80CCD1B) + ELSS (remaining 80C) + PPF + mutual funds (medium term) + emergency fund. NPS sirf retirement ke liye hai.",
    source: "Holistic Retirement Planning Framework",
    sourceUrl: "https://www.pfrda.org.in/",
    topic: "strategy",
    keywords: ["nps with ppf mutual fund", "retirement portfolio india", "nps epf ppf together", "nps elss ppf strategy", "best retirement plan india", "nps complement mutual funds", "nps not substitute liquid funds", "nps emergency fund", "complete retirement planning india"],
    embedding_hint: "How to combine NPS with other investments. NPS PPF ELSS EPF combined strategy. Best retirement portfolio India."
  }

];
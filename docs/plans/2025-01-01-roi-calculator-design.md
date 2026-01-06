# Truv ROI Calculator - Product Design

**Purpose:** Gated web widget for prospects to calculate potential savings with Truv
**Audience:** Leadership review
**Status:** MVP proposal

---

## 1. Problem & Opportunity

### The Challenge
Prospects evaluating Truv need to understand their potential ROI before engaging with sales. Today, this requires:
- Manual spreadsheet modeling by sales reps
- Back-and-forth to gather prospect data
- Delayed value demonstration

### The Opportunity
A self-service ROI calculator that:
- Captures qualified leads with real buying signals (loan volume, mix)
- Demonstrates tangible value before a sales conversation
- Scales the "spreadsheet conversation" that closes deals

### Core Value Prop
> Given a lender's volume, mix, and conversion rates, Truv reduces manual VOAs across the funnel, which lowers cost per funded loan and increases funded volume—quantified in dollars.

---

## 2. User Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1: Lead Capture (Gate)                                    │
│  ───────────────────────────────                                │
│  Name, Company, Email, Phone                                    │
│  Industry (dropdown)                                            │
│  Funded loans (annually)                                        │
│                                                                 │
│  [Calculate My Savings]                                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 2: Instant Summary                                        │
│  ───────────────────────────                                    │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Estimated Annual Savings: $84,139                      │    │
│  │  Savings Per Funded Loan: $42                           │    │
│  │  Reduction in Manual Verifications: 36%                 │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  Want a more precise estimate?                                  │
│  [Refine My Numbers]          [See Full Breakdown]              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 3: Detailed Breakdown                                     │
│  ──────────────────────────                                     │
│                                                                 │
│  YOUR CURRENT STATE              WITH TRUV                      │
│  ──────────────────              ─────────                      │
│  VOAs at app start: 4,500        Truv VOAs: 5,400               │
│  TWN VOIEs: 3,024                Truv VOIEs: 3,024              │
│  Re-verifications: 1,134         TWN (remaining): 1,382         │
│  ──────────────────              ─────────                      │
│  Total Cost: $232,488            Total Cost: $148,349           │
│                                                                 │
│  [Funnel visualization showing VOAs at each stage]              │
│                                                                 │
│  ┌─ Refine Your Numbers (expandable) ─────────────────────┐     │
│  │  Volume & Mix | Funnel Efficiency | Income Mix         │     │
│  └────────────────────────────────────────────────────────┘     │
│                                                                 │
│  "Borrowers try Truv first because it has proven most           │
│   reliable." — Austin Coleman, SVP, America First Credit Union  │
│                                                                 │
│  [Talk to Sales]                                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Input Fields

### Lead Form (Required - Gate)

| Field | Type | Notes |
|-------|------|-------|
| Name | Text | Required |
| Company | Text | Required |
| Email | Email | Required |
| Phone | Tel | Required |
| Industry | Dropdown | Mortgage / Credit Union / Consumer Lending / Auto Lending |
| Funded loans (annually) | Number | Required - primary scale driver |

### Guided Refinement (Optional - Expandable Sections)

#### Section 1: Volume & Mix
| Field | Default | Why It Matters |
|-------|---------|----------------|
| Retail % | 70% | Determines where Truv applies |
| Wholesale % | 20% | Determines where Truv applies |
| Borrowers per application | 1.5 | Inflates VOA volume (joint borrowers) |

#### Section 2: Funnel Efficiency
| Field | Default | Why It Matters |
|-------|---------|----------------|
| End-to-end conversion rate | 30% | App started → Funded |
| Pull-through rate | 60% | App submitted → Funded |
| *(App submission rate)* | *(calculated: 50%)* | E2E CR / Pull-through |

#### Section 3: Income Mix
| Field | Default | Why It Matters |
|-------|---------|----------------|
| W-2 borrower rate | 80% | Critical driver - Truv ROI proportional to this |

**Sales guidance:** If a prospect doesn't know exact rates, use industry-safe defaults and position outputs as directional but conservative.

---

## 4. Calculation Logic

The calculator implements the proven ROI model from the sales spreadsheet.

### Layer 1: Funnel Reconstruction

Rebuild the lender's funnel backward from funded loans:

```
Apps started = Funded loans / E2E CR
Apps submitted = Funded loans / Pull-through rate
App submission CR = E2E CR / Pull-through rate
W-2 apps submitted = Apps submitted × W-2 borrower rate
VOAs during application = Apps started × Borrowers per app
VOIEs during application = W-2 apps started × Borrowers per app
VOIEs after submission = W-2 apps submitted × Borrowers per app
VOIEs at re-verification = Funded loans × Borrowers per app
```

### Layer 2: Current State (Baseline Cost)

```
VOA conversion = 50% (industry benchmark)
SSV conversion = 20% (Fannie/Freddie data)
TWN VOIE conversion = 60% (industry benchmark)

VOAs = VOAs during application × VOA conversion
SSV verifications = VOAs × SSV conversion
VOIEs required after SSV = VOIEs after submission - (SSV × App submission CR)
TWN VOIEs (initial) = VOIEs required × TWN conversion
TWN VOIEs (re-verify) = TWN initial × Pull-through rate

Current VOA Cost = VOAs × $10
Current TWN Cost = (TWN initial + TWN re-verify) × $62
Total Current Cost = VOA Cost + TWN Cost
```

### Layer 3: Future State with Truv (Savings Engine)

```
Truv VOA conversion = 60%
Truv SSV conversion = 24%
Truv VOIE conversion = 42%
TWN VOIE conversion (reduced) = 36% (Truv captures easy conversions)

Truv VOAs = VOAs during application × Truv VOA conversion
Truv SSV = Truv VOAs × Truv SSV conversion
Truv VOIEs = VOIEs during application × Truv VOIE conversion
VOIEs still needed = VOIEs after submission - (Truv SSV + Truv VOIEs) × App submission CR
TWN VOIEs (initial) = VOIEs still needed × TWN conversion (reduced)
TWN VOIEs (re-verify) = TWN initial × Pull-through rate

Truv VOA fees = Truv VOAs × $6
Truv VOIE fees = Truv VOIEs × $10
Truv re-verify fees = $0 (free for 90 days)
TWN fees = (TWN initial + TWN re-verify) × $62

Total Future Cost = Truv fees + TWN fees
```

### Layer 4: Savings Output

```
Annual Savings = Total Current Cost - Total Future Cost
Savings Percentage = Annual Savings / Total Current Cost
Savings Per Funded Loan = Annual Savings / Funded Loans
Automation Rate (Current) = 80%
Automation Rate (Truv) = 90%
```

---

## 5. Output Design

### Summary View (Immediate)

Three headline metrics:
1. **Estimated Annual Savings** - Dollar amount (e.g., $84,139)
2. **Savings Per Funded Loan** - Unit economics (e.g., $42)
3. **Reduction in Manual Verifications** - Percentage (e.g., 36%)

### Detailed Breakdown View

#### Side-by-Side Comparison
| Current State | With Truv |
|---------------|-----------|
| Line-item costs | Line-item costs |
| Total cost | Total cost |

#### Funnel Visualization
Visual showing VOAs at each stage:
- App started (highest volume, highest fallout)
- App submitted
- Funded

Key insight to communicate: **Most cost occurs up-funnel, where fallout is highest.**

#### Industry-Specific Social Proof
Dynamic quote based on selected industry:
- Mortgage → CrossCountry, AmeriSave, Compass
- Credit Union → America First
- Consumer → HFS Financial
- Auto → TurboPass

### Refinement Panels
Collapsible sections for users who want precision:
- Volume & Mix
- Funnel Efficiency
- Income Mix

Each field updates calculations in real-time.

---

## 6. MVP Scope

### In Scope
- Lead capture form with required fields
- Guided refinement sections (collapsible, smart defaults)
- Real-time calculation engine (spreadsheet logic)
- Summary output display
- Detailed breakdown view
- Funnel visualization
- Industry-specific quote display
- Embeddable widget format
- Mobile-responsive design
- Basic form validation

### Out of Scope (MVP)
- PDF report generation
- Email delivery of reports
- Plan comparison logic (Sheet 2)
- Pricing tier recommendations (Sheet 3)
- CRM integration (HubSpot/Salesforce)
- A/B testing infrastructure
- Analytics dashboard
- Multi-language support
- Custom branding per embed

### Technical Decisions (TBD)
- Embed format: iframe vs. Web Component vs. JS widget
- Form submission endpoint
- Lead data storage

---

## 7. Success Metrics

### Primary: Lead Generation
| Metric | Definition |
|--------|------------|
| Leads captured | Total form submissions |
| Completion rate | Started form → Submitted |
| Lead quality score | Based on volume tier + industry |

### Secondary: Pipeline Value
| Metric | Definition |
|--------|------------|
| Estimated deal value | Sum of potential ARR from leads |
| Lead → Meeting rate | % of leads that book sales call |
| Lead → Close rate | % of leads that become customers |

### Tertiary: Sales Acceleration
| Metric | Definition |
|--------|------------|
| Time to first meeting | Days from lead to scheduled call |
| Sales cycle length | Calculator leads vs. other sources |

---

## 8. Future Roadmap

### V1: Reports & Integration
- PDF report generation with charts
- Automated email delivery
- CRM integration (lead sync to HubSpot/Salesforce)
- UTM tracking for attribution

### V2: Plan Optimization
- Plan comparison logic (Per Borrower vs. Per Funded Loan vs. Bundle)
- Volume-based pricing recommendations
- "What-if" scenarios (change volume, see plan impact)

### V3: Sales Enablement
- Analytics dashboard for sales team
- Lead scoring and prioritization
- Saved calculations for follow-up
- Rep-specific tracking links

---

## 9. Talk Track (Sales Positioning)

When prospects use the calculator, reps should follow up with:

1. "Let's start with your funded loan volume."
2. "Now let's model how many income checks you're doing before funding."
3. "Here's what that costs you today—even on loans that never close."
4. "Truv collapses those checks into a single verified asset."
5. "That saves you $X per loan, or $Y per year, without changing borrower behavior."

---

## 10. Why This Model Works

The calculator earns credibility because it:
- Uses **funnel math**, not vanity averages
- Accounts for **fallout**, not just funded loans
- Scales with **borrower count** (joint files)
- Uses **conservative assumptions** → defensible with ops leaders
- Shows VOAs don't just happen at funding—**most cost occurs up-funnel**

---

*Document created: January 2025*

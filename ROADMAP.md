# Abundance.AI — Go-to-Market Roadmap

> **Status:** Planning · April 2026
> **Reality check:** No one is buying anything yet. We're going to market, not optimizing.

---

## TL;DR — The Strategy

**Two parallel tracks:**

1. **Paid → Sales Call → $9K DFY** *(primary revenue engine, build first)*
2. **Organic → Tribe** *(long-game brand play, parked until paid funnel works)*

**The active offers** (everything else is parked):

| # | Offer | Price | Mechanic | Page |
|---|---|---|---|---|
| 1 | **DFY Selling System** | $9K (0% financing) | One-time install, sales-call close | `/selling-system` |
| 2 | **Shift** | $1,500/mo (target) | Group coaching + templates · post-DFY continuity | `/shift` |
| 3 | **Partner** | $10K/mo (3-4 mo) | Ryan as Head of GTM, 1:1 ad-hoc only | `/partner` |

Tribe, Free Training, Unlocked, Freedom — **parked** for now. Don't promote, don't build.

---

## The Funnel (Primary GTM)

```
PAID ADS (Meta, $3K/mo to start)
        │
        ▼
LANDING PAGE  (/selling-system)
        │
        ▼
SALES CALL (booked via GHL calendar)
        │
        ▼
DFY SELLING SYSTEM CLOSE  ($9K · 0% financing option)
        │
        ▼
30-DAY INSTALL  (Ryan delivers)
        │
        ▼
SHIFT CONTINUITY  ($1,500/mo · group coaching + templates)
```

**Partner runs parallel** — only pitched 1:1 in conversations, never the front-door offer.

---

## The Three Active Offers — Detail

### 1. DFY Selling System — Primary Offer
- **Price:** $9,000 one-time
- **Financing:** 0% down option (Klarna / Affirm / Stripe Capital)
- **Promise:** Install the Abundance Selling System end-to-end in 90 days — offer, funnel, CRM, tracking
- **Who it's for:** Founders generating $20k–$200k/mo who need a real selling system
- **CTA:** "Book a Call" → calendar embed → 30-min strategy call → close
- **Page:** `/selling-system` — built on new brand system, has Stripe mockup, needs polish (price card, financing, case studies, sales call CTA)
- **Funnel role:** Front door for paid ads

### 2. Shift — Continuity / Recurring
- **Price:** $1,500/mo target ($997/mo floor)
- **Promise:** Stay supported after DFY install — group coaching weekly, all templates, ongoing optimization
- **Who it's for:** DFY graduates who want continued support
- **CTA:** Internal upsell, pitched at month 2 of DFY install
- **Page:** `/shift` — currently on old brand, needs rebuild as continuity offer (not standalone DFY)
- **Funnel role:** MRR engine; backend value extraction

### 3. Partner — Premium / Ad-hoc
- **Price:** $10K/mo target ($5K/mo floor) on 3–4 month contract
- **Promise:** Ryan comes in as Head of Go-to-Market for one client at a time
- **Who it's for:** Founders wanting hands-on operator-level help, not DIY coaching
- **CTA:** "Apply" → vetting call → contract
- **Page:** `/partner` — currently on old brand, needs rebuild for "send someone here from a 1:1 conversation" use case
- **Funnel role:** Side door; never advertised, only used when conversation goes that direction

---

## What's Parked (don't build right now)

| Offer | Why Parked |
|---|---|
| **Tribe ($97/mo community)** | Organic play, requires content + audience first. Build after paid funnel proves out. |
| **Free Training (3 trainings hub at /free)** | Top of organic funnel, no ads pointing at it yet. Build after Tribe is set up. |
| **Unlocked / Freedom** | Likely merged into DFY ($9K) and Shift ($1,500/mo) tiers. Decision: officially deprecate or rebrand. |
| **`/free/[training-1/2/3]` detail pages** | Lead capture infrastructure for organic. Defer until organic strategy is active. |

These pages should stay live (low cost) but **don't get promoted** anywhere — no nav links, no ad traffic. They can rot quietly.

---

## Page-by-Page Audit

### MUST be polished/built for launch (Tier 1)

| Page | Current State | Action Needed | Priority |
|---|---|---|---|
| `/selling-system` | Built on new brand · stripe mockup · placeholder steps 1-2 · no price card · no booking | Polish to ad-ready: price/financing card, sales call CTA, real case studies, Steps 01+02 mockups, FAQ for objections | **P0** |
| `/partner` | Old brand · old copy | Full rebuild on new brand · position as "Ryan as Head of GTM" · $10K/mo · application-only feel | **P1** |
| `/shift` | Old brand · standalone DFY copy | Rebuild on new brand · reposition as continuity (post-DFY only, not standalone) | **P2** (after DFY launches) |

### Already solid (Tier 0)

| Page | Notes |
|---|---|
| `/brand` | Locked design system reference — no change |
| `/glow-options` | Brand exploration history — no change |
| `/tribe-palettes` | Brand exploration history — no change |

### Parked (low-priority touch-ups)

| Page | Action |
|---|---|
| `/` (homepage) | Update to point at `/selling-system` as primary CTA. Don't fully rebuild yet. |
| `/tribe` | Either hide or update with "Coming Soon" framing. Old brand stays for now. |
| `/free` (training hub) | Same — leave alone or hide. |

---

## Ryan's Task List (only you can do these)

### Decisions to lock (in writing, this week)

- [ ] **Final DFY price:** $9K confirmed?
- [ ] **Financing partner:** Klarna / Affirm / Stripe Capital / PayPal Pay-in-4 — pick one and apply
- [ ] **Final Shift price:** $1,500/mo or $997/mo?
- [ ] **Final Partner pricing:** $10K/mo target, $5K floor — confirmed?
- [ ] **Sales call cadence:** 30 min or 45 min? Day-of-week pattern?
- [ ] **Show-up rate floor:** what % triggers needing a confirmation/reminder system?
- [ ] **Refund/guarantee terms:** 30-day money-back? Conditional guarantee?

### Content to write (you, not me)

- [ ] **2-3 real case studies** — name, business, before/after numbers, photo, quote (for /selling-system)
- [ ] **5-10 testimonials** — short, attributable, with photos (for /selling-system + /partner)
- [ ] **Sales call script** — discovery questions, objection handlers, close framing
- [ ] **Email sequence** for booked calls (confirmation + 24hr reminder + 1hr reminder)
- [ ] **Sales call booking page copy** — what they're committing to, what to bring/think about

### Accounts & tools to set up

- [ ] **Financing partner account** approved + integrated
- [ ] **GHL calendar** configured for sales call booking
- [ ] **Stripe account** ready to take $9K + recurring $1,500/mo
- [ ] **Meta Ads account** with payment method, conversion API keys
- [ ] **Meta CAPI** wired through GHL (open loop in memory)
- [ ] **Ad creative** — at minimum 3 hooks, 5 video ads, 5 image ads ready before launch
- [ ] **PostHog** event tracking confirmed working on `/selling-system`

### Strategic decisions (separate session)

- [ ] **Ad copy / hook angles** — what's the lead idea? "Done-for-you AI selling system" vs "Replace 5 hires" vs "27 days to first $40K" — needs A/B testing plan
- [ ] **ICP narrowing** — is it course creators, agency owners, coaches, all three? Different ad creative per segment
- [ ] **Promise specificity** — "compounding revenue in 27 days" vs "first $40K in 27 days" — pick one and stick with it

---

## Claude's Task List (I can execute these)

### Phase 1 — Polish `/selling-system` for ad-ready (Days 1-3)

- [ ] Replace Step 01 placeholder with AI-generated iPhone Clarity Audit mockup
- [ ] Replace Step 02 placeholder with AI-generated MacBook Frameworks mockup
- [ ] Add **price card section** — $9,000 one-time · 0% financing · "or $300/mo for 30 months" framing
- [ ] Replace generic "Apply Now" CTAs with **"Book a Strategy Call →"** linking to GHL calendar
- [ ] Add **case studies section** — empty templates ready for Ryan's content
- [ ] Add **FAQ section** with the 8-10 common objections (price, time, guarantee, what's included, who it's for, etc.)
- [ ] Add **trust band** — logos of clients, press mentions, or stats (placeholder for now)
- [ ] Add **founder section** — "Who's Ryan" with photo + 2 paragraphs of credibility
- [ ] Add **what's NOT included** section — preempts objection "is this right for me?"

### Phase 2 — Rebuild `/partner` (Days 4-5)

- [ ] Full rebuild on new brand system (matte black + peach + Greycliff + new components)
- [ ] Position as "Ryan as Head of GTM, 1 client at a time, 3-4 month contracts"
- [ ] Lock copy at $10K/mo target, mention $5K available
- [ ] Application-only flow — "Apply for Partner" → form (not direct booking)
- [ ] Make this page feel exclusive, not promotional

### Phase 3 — `/shift` continuity rebuild (Days 6-7)

- [ ] Rebuild on new brand system
- [ ] Reposition as *post-DFY continuity* — group coaching + templates
- [ ] Don't make it a primary front-door offer
- [ ] Pricing block: $1,500/mo (target) with "first 30 days included with DFY install"

### Phase 4 — Homepage update (Day 8)

- [ ] Update homepage to point primary CTA at `/selling-system`
- [ ] Soft-launch the new visual system (peach gradient hero, matte black foundation)
- [ ] Don't fully rebuild — minimum viable update for ad traffic

### Phase 5 — Sales infrastructure (Days 9-10)

- [ ] Add sales call booking section (embedded GHL calendar) on `/selling-system`
- [ ] Wire conversion tracking (Meta Pixel + GA4 + PostHog events) for: page view, scroll, CTA click, calendar opened, call booked
- [ ] Build a `/booked` thank-you page with what to expect + reschedule option
- [ ] Build `/apply` for Partner application form

### Phase 6 — Tribe holding pattern (Day 11)

- [ ] Hide `/tribe` from any homepage links
- [ ] Add "Coming Soon — joining the waitlist" overlay on `/tribe` so the old page doesn't confuse traffic
- [ ] Same treatment for `/free`

---

## Suggested 30-Day Sprint

### Week 1 (Days 1-7) — Ad-ready landing page
- Days 1-3: `/selling-system` polish (price, CTAs, case studies, FAQ, founder section)
- Days 4-5: `/partner` rebuild
- Day 6: Sales infrastructure (calendar embed, booking flow)
- Day 7: Tracking pixel verification + test booking flow end-to-end

### Week 2 (Days 8-14) — Sales mechanics
- Day 8: Homepage minimal update + nav simplification
- Day 9: Booking confirmation/reminder emails (you in GHL)
- Day 10: Financing partner integration
- Days 11-14: Ad creative production (Ryan + creative team)

### Week 3 (Days 15-21) — Soft launch
- Day 15: Soft launch ads at $50/day for 3 days, watch traffic
- Days 16-21: Iterate creative + landing page based on bounce/scroll/booking metrics
- Goal: 1-2 booked calls by end of week

### Week 4 (Days 22-30) — Scale + first close
- Days 22-30: Push budget to $100/day if metrics work
- Goal: 5-10 booked calls per week
- Goal: **First $9K close**

---

## North Star Metrics (track these from Day 1)

| Metric | Definition | Target (90 days) |
|---|---|---|
| **CPB** (Cost Per Booking) | Ad spend / sales calls booked | < $250 |
| **Show rate** | Calls shown / calls booked | 60%+ |
| **Close rate** | DFY closes / calls shown | 20%+ |
| **CAC** | Ad spend / DFY closes | < $1,250 |
| **Time to first dollar** | Date of first $9K close from Day 1 of ads | Day 30 |
| **DFY → Shift conversion** | % of DFY clients who continue into Shift | 70%+ |

---

## Open Loops to Resolve

- [ ] Finalize whether Unlocked + Freedom are deprecated or rebranded
- [ ] Pick official copy stance: "Selling System" vs "DFY Selling System" — used inconsistently right now
- [ ] Domain: keep `findabundance.ai` as primary, point `tryabundance.ai` here (already configured per memory)
- [ ] Decide if `/glow-options` and `/tribe-palettes` should be private (Cloudflare Access) or stay noindex public

---

## What This Document Is

This is the source of truth for the GTM strategy. When in doubt about what to build next, **read this file first**. When the strategy changes, **update this file first**, then execute.

Update cadence: weekly. After every shipped page or every major decision.

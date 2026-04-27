# Abundance.AI — Brand Guidelines

> **Status:** Locked April 2026. Design system is dark-mode only.
> **Live reference:** [/brand](https://findabundance.ai/brand) — all tokens rendered in context.

---

## Brand Foundation

**The Brand:** Abundance.AI is an AI-powered growth systems company for founders. We help coaches, consultants, course creators, and agencies build real Selling Systems so their businesses scale without depending on them to run everything.

**The Mission:** To unlock abundance for every founder who works with us — not just more revenue, but more time, more clarity, and more freedom to build something worth having.

**The Mechanism:** The Selling System — our proprietary integrated framework that connects offer, lead generation, sales, funnels, and automation into one cohesive growth engine. Eliminate first. Automate second. Delegate last.

**The Positioning:** We are not a course. Not an agency. Not a mastermind. We are the operating system behind how serious founders scale — built on real systems, powered by AI, and grounded in actual results.

**Brand Hierarchy:**
Abundance.AI → The Selling System → Abundance Tribe → Selling System Pro
- The brand sells the dream. The Selling System is the vehicle. Tribe is where you learn it. Pro is where you build it.

---

## Taglines & Positioning

| Context | Tagline |
|---|---|
| Abundance.AI brand | AI-Powered Growth Systems For Founders |
| Abundance Tribe community | The Community Where Clarity Happens. |
| The Selling System | The Complete Blueprint Every Founder Needs to Scale. |
| Tribe hero headline | Scaling Your Business Is Harder Than It Should Be. |

---

## Product Stack

| Product | Price | Promise | Who It's For |
|---|---|---|---|
| Abundance Tribe | $97/mo | Clarity on what your business needs and what to build first | Founders already generating revenue, feeling stuck or scattered |
| Selling System Pro | TBD | Actually build the Selling System with templates, frameworks, and DWY support | Tribe members ready to implement |

**Important distinction:** Abundance Tribe teaches how the systems work and how to think about them. Selling System Pro is where founders actually build. Never use "build" or "install" language for Tribe. Use "understand," "learn," "clarity," and "direction."

---

## Design Mode

**Dark mode only.** Every brand surface (marketing pages, landing pages, blog posts, ads) is matte black. The luminous-glow mechanic doesn't translate to light bg, and the strongest editorial brands commit to one mode.

If a future dashboard, transactional email, or print piece needs light mode, build it as a separate "interface" mode using the same color tokens — flat solids, dark ink, no glow. That's an interface system, not the brand.

---

## Foundation — matte black + cream

The brand never leaves matte black. Cream handles all primary text. These eight tokens carry every page; nothing else is allowed at the foundation level.

| Role | Hex | Usage |
|---|---|---|
| Background | `#0F0F0F` | Primary page color |
| Surface 1 | `#161616` | Top of card gradient |
| Surface 2 | `#1D1D1D` | Bottom of card gradient |
| Surface 3 | `#242424` | Hover, raised, chip backgrounds |
| Cream | `#F5F0E8` | Primary text, headlines |
| Cream Body | `#D5CFC4` | Paragraph copy |
| Cream Muted | `#9C968C` | Labels, captions, eyebrows |
| Border | `rgba(245,240,232,0.08)` | 8% cream — card edges, dividers |
| Border Strong | `rgba(245,240,232,0.18)` | Emphasized dividers |

---

## The Final 6 Glow Palette

Every page picks colors from these six. Each has a single role. Pages rotate which colors appear in which sections, but **no new colors get introduced**. All six are 4-stop gradients on a 135° angle, cream → deep.

| # | Color | Role | Hex stops (cream → deep) |
|---|---|---|---|
| 01 | **Peach** | Primary Signature | `#F5F0E8` → `#F8C5A8` → `#E8967E` → `#C4715E` |
| 02 | **Coral** | Warm Sibling | `#F5F0E8` → `#FECACA` → `#FB7185` → `#BE123C` |
| 03 | **Copper** | Bronze Depth | `#F5F0E8` → `#F2D4B8` → `#B87333` → `#6B4120` |
| 04 | **Mocha** | Warm Grounder | `#F5F0E8` → `#DDC5B3` → `#8B5A3C` → `#40220F` |
| 05 | **Cerulean** | Cool Accent | `#F5F0E8` → `#B8DDEC` → `#2A7FB8` → `#1A4A6B` |
| 06 | **Slate** | Neutral Ground | `#F5F0E8` → `#C7D0D9` → `#475569` → `#1E293B` |

**Pairs by family:**
- Pinks/oranges → Peach (soft) + Coral (punchy)
- Browns/metallics → Copper (bronze) + Mocha (chocolate)
- Cools → Cerulean (hue) + Slate (neutral)

### When to use each

| Color | Section types |
|---|---|
| **Peach** | Hero, primary CTAs, page bookends, footer mark, logo, every page identity moment |
| **Coral** | Community/Tribe sections, urgency, energy, secondary CTAs, callouts that need more punch than peach |
| **Copper** | Heritage moments, case studies, long-form essays, Partner tier, Freedom offer — the "earned" warm |
| **Mocha** | Testimonials, founder stories, serious-warm sections — where Slate would feel too cool |
| **Cerulean** | Features, product UI, data visualization, integrations, technical sections — single cool hue per page |
| **Slate** | Pricing, FAQ, legal, comparison tables, dense data — the quiet/serious anchor |

### Per-section glow rotation

- **Hero is always Peach.** Always. Non-negotiable.
- **Each section picks ONE color** for its radial bg + em color.
- **No section uses two glows.** No "transitional" gradients between glows.
- **Final CTA bookends back to Peach** — closing the page on the brand color.

---

## The Glow Gradient Theory

Every glow gradient follows the same 4-stop template on a 135° angle:

```
0%   → Cream (#F5F0E8)         · luminous origin point
40%  → Pale tint of color       · transition
75%  → Saturated mid (the hue)  · the color moment
100% → Deep anchor              · still saturated, never near-black
```

**Why each stop matters:**
- **Cream at 0%:** Creates the "glow-from-within" effect on matte black. This is what makes the system feel luminous.
- **Pale tint at 40%:** Smooths the cream → mid transition. Without it, the gradient bands.
- **Saturated mid at 75%:** This is the color moment people read.
- **Deep anchor at 100%:** Anchors the gradient in the hue. Must stay saturated — if it goes near-black it dissolves into the matte canvas.

**Other gradient roles** (smaller variants of the main pattern):

| Use | Pattern | Example (peach) |
|---|---|---|
| Button fill (2-stop) | mid → light | `#E8967E → #F8C5A8` |
| Button hover (2-stop) | deep → mid | `#C4715E → #E8967E` |
| Hero radial halo | cream/mid blend at top-center | `radial-gradient(ellipse 100% 55% at 50% 0%, rgba(232,150,126,0.18), transparent 65%)` |
| Card surface | matte 2-stop | `linear-gradient(135deg, #161616, #1D1D1D)` |

---

## Typography

**Greycliff CF** — handles everything (body, headlines, labels, stats, UI). Adobe Fonts via Typekit project `bxi7koh`.

**Neo Contact LT Pro** — reserved exclusively for `<em>` inside `<h1>/<h2>/<h3>`. Self-hosted at `/assets/fonts/neo-contact/neo-contact-lt-pro.woff2`. Single weight (700).

### Greycliff weights & roles

| Weight | Use |
|---|---|
| 400 · Regular | Body copy default |
| 500 · Medium | Labels, subtle emphasis |
| 600 · SemiBold | Secondary headlines |
| 700 · Bold | Primary headlines |
| 800 · ExtraBold | Display sizes, stat numbers |

### The em rule

`<em>` inside `<h1>`, `<h2>`, or `<h3>` is the brand's biggest typographic moment. It renders as:
- **Font:** Neo Contact LT Pro 700
- **Layout:** `display: block` — always on its own line
- **Size:** 1.2× the parent heading
- **Color:** Peach gradient fill (or, if section uses non-peach glow, that section's glow)

**Use once per page maximum.** It's the headline word that matters most. If you find yourself reaching for a second em, you're underusing the rest of the type system.

### Headline patterns

1. **Default** — solid cream Greycliff Bold 700. No gradient.
2. **Inline gradient** — wrap a key word in `<span class="gradient">` for inline color without changing size.
3. **Big em** — wrap the brand-defining word in `<em>` for the once-per-page Neo Contact moment.

---

## Logo System

- **Wordmark:** Greycliff Bold 700 — "Abundance.AI"
- **Default lockup:** light wordmark on matte black. This is the only mode for marketing.
- **Email/print only:** dark wordmark on cream. Never default.
- **Logo gradient mark:** small 24px rounded square with the Peach gradient — sits beside the wordmark in nav, footer, and small-format usages

**Logo rules:**
- Never stretch, rotate, or recolor.
- Never place light logo on light bg or dark logo on dark bg.
- Never use the wordmark without the brand gradient mark in nav contexts.
- Logo mark is always Peach gradient — never any other Final 6 color.

---

## Components

### Buttons

| Variant | Background | Text | Use |
|---|---|---|---|
| **Primary** | Peach gradient (mid → light) | Dark warm `#3A1810` | Main CTAs, Apply Now, Join the Tribe |
| **Ghost** | Matte fill, peach gradient border | Cream | Secondary CTAs |
| **Cream** | Solid cream `#F5F0E8` | Dark `#0F0F0F` | Tertiary or contrast CTAs (especially on Coral/Cerulean section bg) |

**Hover:** primary darkens one step (deep → mid), ghost picks up surface-1 fill.

**CTA Copy Rules:** Hero buttons never show price. Mid-page CTAs say "Join Abundance Tribe." Final CTA can include "— $97/mo." Button text title-case (not all-uppercase) with arrows for primary actions.

### Highlight pills · 20px radius

| Variant | Use |
|---|---|
| `.highlight` | Solid cream with dark text — strong inline emphasis |
| `.highlight-peach` | Peach gradient with dark text — value/numeric callouts |
| `.highlight-cream` | Subtle 8% cream fill with cream text + border — soft emphasis |

### Corner radius standards

- **20px** — cards, containers, highlight pills (default)
- **10px** — buttons
- **100px** — pill labels (badges, urgency bars, nav CTAs)

No other radii allowed.

---

## Rules of Engagement

The system holds together because every page follows the same rules. Each one prevents a specific failure mode.

1. **Six colors only.** Peach, Coral, Copper, Mocha, Cerulean, Slate. No new colors.
2. **Dark mode only.** Every brand surface matte black.
3. **One em per page.** Neo Contact + peach gradient + own line + 1.2× parent. The page's most important word.
4. **One glow per section.** Each section picks one of the six. Hero is always Peach.
5. **135° gradients always.** Top-left to bottom-right. Don't rotate.
6. **4-stop pattern.** Cream → pale tint → saturated mid → deep anchor. Don't drop the cream start.
7. **20 / 10 / 100 radii.** Cards/pills 20px. Buttons 10px. Pill labels 100px.
8. **Greycliff is the default.** Neo Contact ONLY inside `<em>` within h1/h2/h3.
9. **Color from content.** Photography, product screenshots, abstract art carry the variety — not extra brand colors.
10. **Buttons always carry peach.** Primary fills the gradient. Ghost borders it.

---

## Voice & Tone

### We Do
- Speak directly to the founder — "you," not "founders"
- Use short, punchy sentences. Then explain.
- Name the specific problem before offering the solution
- Be confident without being arrogant
- Use real numbers from real results
- Use plain language — no jargon, no buzzwords
- Make the outcome clear before explaining the mechanism

### We Don't
- Use em dashes to pivot sentences — it reads as AI
- Promise outcomes we can't back up yet
- Use "genuinely," "honestly," or "straightforward"
- Say "passive income" or "replace yourself completely"
- Overuse bold text, bullet points, or headers in copy
- Use generic phrases like "game-changing" or "revolutionary"

### Instead Of → Say This
- "Build a passive business" → "Build a business that scales without depending on you for everything"
- "Revolutionary AI-powered framework" → "A system built around how founders actually scale"
- "Our proven system guarantees results" → "Built from 5+ years of building the systems behind $12M+ in revenue"
- "This will change your life" → "This will change how you think about scaling your business"

---

## Reference

- **Live design system:** [/brand](https://findabundance.ai/brand)
- **Glow color exploration history:** [/glow-options](https://findabundance.ai/glow-options) — the 29-color exploration that produced the Final 6
- **Pattern reference for new pages:** [/selling-system](https://findabundance.ai/selling-system) — full DFY offer page using the system
- **Source of truth in code:** any HTML page using the locked `:root` tokens listed in `/brand` and the `--glow-*` CSS variables

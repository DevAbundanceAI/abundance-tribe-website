# Abundance.AI — Brand Guidelines

> **Status:** Locked v1.9 · May 2026 · *Living document — paired with [/brand](https://findabundance.ai/brand) as the rendered source of truth.*
>
> **Rule of thumb:** If you have to ask "is this on-brand?", check `/brand` first. If `/brand` doesn't show it, it isn't on-brand yet.

---

## Brand Foundation

**The Brand:** Abundance.AI builds Selling Systems for founder-led businesses. We install the entire revenue engine — ads, funnel, CRM, sales infrastructure — in 14 days flat, then we tune.

**The Mission:** Unlock real abundance for every founder — not just more revenue, but more time, more clarity, more leverage. Stop being the funnel.

**The Mechanism:** The Selling System — our 4-pillar integrated framework (Source · Engage · Close · Retain) that compounds when every pillar is active and tilts when any one is missing.

**The Positioning:** Not a course. Not an agency. Not a mastermind. We **install** a working system you own, then optimize it for you.

**Audience:** Coaches, consultants, course creators, agencies doing $30K–$300K/mo who are tired of being the funnel.

---

## Brand Stack

| Layer | What | Where |
|---|---|---|
| **Abundance.AI** | The parent brand · the dream | Marketing surfaces · all public pages |
| **The Selling System** | The proprietary mechanism · the install | The flagship offer · `/selling-system` |
| **Cohort 04 (etc.)** | The recurring delivery window | Active sales periods |
| **Launch · Install · Shift · Scale** | The 4 product tiers (verbs) | Pricing page |

See `OFFERS.md` for full product/offer stack with prices.

---

## Visual System · v1.9

The brand is **dark-mode default**. Tiger's-blood crimson on matte black with selective cream stages for visual breath. The design system was built for dark and translates to cream only as **intentional stage rhythm**, never as a user preference.

### Palette

**Foundation (matte black + cream):**

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0A0A0A` | Page background · dark stages |
| `--surface-1` | `#141414` | Nested dark cards |
| `--surface-2` | `#1B1B1B` | Step-up depth |
| `--surface-3` | `#242424` | Deepest nested surface |
| `--cream` | `#F5F0E8` | Cream stage background |
| `--cream-soft` | `#FAF6EF` | Cards inside cream stages |
| `--cream-deep` | `#ECE5D8` | Subtle cream depth variant |

**Ink (text):**

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#F5F0E8` | Primary text on dark |
| `--ink-body` | `#C9C2B5` | Body text on dark |
| `--ink-muted` | `#807A70` | Labels/eyebrows on dark |
| `--ink-dark` | `#0A0A0A` | Primary text on cream |
| `--ink-dark-soft` | `#3A3530` | Body text on cream |
| `--ink-dark-muted` | `#6A645B` | Labels/eyebrows on cream |

**Tiger's blood — the only accent (v1.9 fire-red, locked):**

| Token | Hex | Role |
|---|---|---|
| `--sig-highlight` | `#FF5733` | Highlight stop · gradient peak |
| `--sig` | `#ED1C24` | **PRIMARY tiger's blood · text & solid accent** |
| `--sig-deep` | `#B30E14` | Deepening red · borders, deep gradient stop |
| `--sig-anchor` | `#7A0712` | Anchor blood · dark gradient tail |

### Gradients

Three flavors of the tiger's-blood gradient, mapped to typographic role:

| Token | Stops | Use |
|---|---|---|
| `--grad-sig-hero` | Specular peak @ 67% | h1 `<em>` only, animated borders |
| `--grad-sig` | Full sweep (highlight→anchor) | Buttons, pills, badges, surfaces |
| `--grad-sig-tight` | Compressed red range | h2/h3 `<em>`, sub-headline emphasis, cream-stage gradient text |

**Achromatic backup:**
- `--grad-graphite` — light → dark gray, for "brand recedes" moments
- `--grad-graphite-shine` — silver shine, prestige variant

---

## Typography Spine

Three fonts. Three roles. No fourth.

| Font | Token | Role |
|---|---|---|
| **Greycliff CF** (Typekit `bxi7koh`) | `--font-sans` | Every h1/h2/h3, body, pills, buttons, UI. Headlines at weight 800. |
| **DM Serif Display Italic** (Google Fonts) | `--font-display` | `<em>` inside headings only. Always with gradient text fill. Never standalone body. |
| **Neo Contact LT Pro** (local @font-face) | `--font-logo` | The "Abundance" wordmark · and the brand-mark "A" glyph (see Rule 13). Nothing else. |

**Type ramp:**

| Token | Size | Use |
|---|---|---|
| `--t-hero` | clamp(56px, 8vw, 112px) | Final-CTA hero, mega banners |
| `--t-h1` | clamp(44px, 6vw, 80px) | Section h1 |
| `--t-h2` | clamp(36px, 4.5vw, 56px) | Section h2 |
| `--t-h3` | 20–26px | Card titles |
| `--t-body` | 17px | Body copy |
| `--t-micro` | 13px | **FLOOR — never go below.** |

---

## The 13 Rules

1. **One accent only.** Tiger's blood and its gradient family. Never pair with a second hue family.
2. **Gradient on every `<em>`.** Every `<em>` inside a heading uses the appropriate gradient text fill (hero on h1, tight on h2/h3).
3. **Neo Contact = logo only.** `--font-logo` is reserved for the Abundance wordmark + the brand-mark "A" glyph.
4. **95% achromatic, 5% splash.** Tiger's blood appears once per card. Never on every element.
5. **Per-column visual media variety.** In multi-column layouts, each column gets a different visual medium.
6. **Sans-bold + serif-italic = only emphasis pattern.** Greycliff 800 with DM Serif italic gradient `<em>`. No underlines or color-only emphasis.
7. **One dot-period per page.** The tiger's-blood dot replacing a period is a signature mark — use once.
8. **Sections are rounded stages.** Every section has border-radius. Cream page hosts dark stages; dark page hosts cream stages.
9. **The page is alive.** Cursor light, ambient drift, pulse on brand marks, gradient slide on CTA hover. Always at least three motion behaviors.
10. **If it's not on /brand, it isn't on-brand yet.** Reuse beats invent. Add to `/brand` before using elsewhere.
11. **Font-size floor is 13px.** Smallest text on any surface is `--t-micro`.
12. **Gradient before flat color.** For any accent surface, reach for `--grad-sig` first. Flat `--sig` is only for small text labels and SVG strokes.
13. **The brand-mark "A" is Neo Contact, upright.** Wherever the Abundance monogram "A" appears as a graphic (glass cube, hub-and-spoke center, methodology core, brand tile), render it in `--font-logo` with `font-style: normal`. DM Serif italic warps the letterform. A/B/C/F step-labels in headlines and content stay italic — the rule applies only to the brand monogram.

---

## Stage Rhythm

The brand is dark-mode primary. To prevent visual monotony on long pages, sprinkle in **cream stages** as breath moments — sections that intentionally invert to a cream background with native cream design (cast shadows instead of glows, hairline-cream borders, `--grad-sig-tight` gradient text instead of HERO, drop-caps and editorial typography where appropriate).

**Target rhythm:** ~70% dark stages, ~30% cream stages, spaced roughly every 5–6 sections apart.

**Best candidates for cream stages:**
- Methodology / framework reveal (the "stop and think" moment)
- Founder story / personal narrative (magazine-profile feel)
- Final CTA (the "decision moment")
- Quote spotlight (single big testimonial)
- Pricing (intentional gravity)
- Manifesto / beliefs section
- Cream-bg Process / How variant

**Cream stages are not user preference — they are design decisions.** The visual mode of each section is locked by its CSS, not by a toggle.

---

## Dark Mode Is the Brand · No Auto-Adapt

Marketing pages (`/`, `/selling-system`, `/free`, `/case-studies`, future landing pages) are **dark-mode locked**. There is no user-facing light/dark toggle on these pages. The brand surface is dark because:

1. Every ad, VSL, and content piece is filmed/designed dark — the funnel is dark end-to-end
2. The design system (glows, gradients, glass) was built for dark · light translations are weaker
3. Premium brands force their visual intent (Linear, Vercel, Anthropic, Apple product pages)
4. Auto-adapting to OS preference splits the audience and weakens brand consistency

**Exception:** `/brand` and `/templates` keep a manual light/dark toggle as a **documentation feature** — used to demo "here's what stage-rhythm cream sections look like" to prospects and clients. Visitors landing on the actual marketing pages never see this toggle.

---

## Container Palette (`/brand` C1–C12)

Every card, panel, or boxed element on a dark stage uses one of twelve documented container styles. **C1 (hairline) is the workhorse — 90% of cards.** See `/brand` for the live gallery.

| Container | Use |
|---|---|
| **C1** Hairline border, matched bg | Default workhorse |
| **C2** Borderless, slight surface | Cards on contrasting surface |
| **C3** Gradient border | "This is the one" |
| **C4** Depth gradient | Elevation without color |
| **C5** Fade-to-nothing | Implies "continues below" |
| **C6** Featured halo | MOST POPULAR tier |
| **C7** Frosted glass | Floating nav, modals |
| **C8** Gradient fill | Final CTA only |
| **C9** Dot vignette | Texture without color |
| **C10** Animated red border | Featured tier, alive |
| **C11** Animated silver border | Prestige variant |
| **C12** Outer glow halo | Guarantee badge, hero objects |

---

## Component Vocabulary

**Pills · 6 inline-keyword states + 2 modifiers** (Pattern C / `/brand`):

- `.filled` — red gradient surface, cream text (loudest)
- `.glow` — gradient border + faded transparent red interior glow, warm-cream text (mid)
- `(default)` — red gradient border, dark interior, red text (quietest)
- `.solid` — cream fill, red gradient border, red text
- `.cream` — cream fill, hairline border, red text (restraint)
- `.ink` — cream fill, hairline border, black text
- `.silver` (modifier) — swap red gradient for graphite-shine
- `.label` (modifier) — 20px-radius uppercase stamp

**Underline callouts · 5 variants** for softer-than-pill emphasis:
- `.uline` (flat red) · `.uline.white` · `.uline.grad` (red gradient) · `.uline.silver` (silver gradient) · `.uline.marker` (hand-drawn marker swipe)

**Buttons:** `.btn.ghost` · `.btn.dark` (silver shine + red undercast) · `.btn.gradient` (sweeping gradient on hover) · `.btn.outline-pill` (cream pill + dark border + gradient circle-arrow — the brand's "decision pill").

---

## Motion

Required motion behaviors per page (Rule 9):
1. **Cursor-tied light field** (hero only) — radial glow follows visitor's cursor
2. **Ambient blob drift** — slow-drifting blurred color blobs
3. **Pulse glow** — brand marks pulse softly ("alive / running")
4. **Gradient slide on CTA hover** — CTA backgrounds are 200% wide and slide on hover
5. **Animated border shine** (C10/C11) — rotating arc on featured cards

---

## Imagery

**The brand-mark "A" glyph** — Neo Contact, upright, gradient-text-filled. Used as a brand monogram in hub-and-spoke centers, glass cubes, founder gallery tiles. See Rule 13.

**Portraits** — Use `.portrait` utility (radial-gradient face-highlight + skin-tone base). Variants: default (warm red), `.cool` (blue-slate), `.warm` (bronze). Sizes: `.sm` (40px), default (64px), `.lg` (92px).

**Logos** — Client logos render in DM Serif Display, color `--ink-muted`, opacity 0.65 (grayscale-ish). See `/templates` Logo Carousel category for layouts.

**Product/UI mockups** — `.mock-phone` and `.mock-laptop` utilities provide realistic chrome (notch, browser dots, sidebar) with branded interior content (red pipeline rows, dashboard stats).

---

## File Map

| File | Purpose |
|---|---|
| `/brand` (brand.html) | Live brand reference · tokens, rules, sections, components, motion, content — rendered in context |
| `/templates` (templates.html) | Template library · 130+ section templates across 32 categories · portable token system |
| `BRAND.md` (this file) | Foundational doc · content-agnostic · canonical rules |
| `OFFERS.md` | Offer stack · prices · positioning per product |
| `/` (index.html) | Homepage · composed from `/templates` primitives · dark with 3 cream stages (Methodology, Founder, Final CTA) |
| `/selling-system` | Primary offer page |

---

## Building a Client's Brand

The template library is **portable**. To install a brand-locked `/brand` and `/templates` for a client:

1. Copy `brand.html` and `templates.html` to the client repo
2. Swap `:root` token values (palette, fonts) for their brand
3. Replace placeholder content (testimonials, logos, names, numbers) with their real content
4. Adjust the cream-stage rhythm to match their tone (more cream for editorial brands, less for ops-heavy brands)
5. Ship — they have their own brand-locked design system in 1–2 hours

The HTML/CSS structure stays. Only tokens and content swap.

---

**Last updated:** May 17, 2026 · Brand System v1.9 + Stage Rhythm + Dark-Mode-Locked Marketing.

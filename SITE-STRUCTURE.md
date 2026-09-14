# Site structure: how the firm is packaged

Locked 2026-09-14 with Ryan. Supersedes `HOMEPAGE-REBUILD.md` (that brief
shipped, then got corrected the same day: the page it described was the AI
offer, not the firm).

## The one-line version

**Abundance is software plus agency services plus coaching**
(`abundance-os/clients/README.md`). The site sells all of it under one noun,
**go-to-market systems**, with one mechanism that makes the breadth a reason
rather than a red flag, and one action everywhere.

## The mechanism: the constraint moves

A capability list invites a prospect to compare you line by line against a
specialist in each row, and you lose every one. Breadth only wins when the
breadth is the product. The argument is Theory of Constraints, which is already
Ryan's:

> Fix the ads and the bottleneck shows up in the funnel. Fix the funnel and it
> shows up in sales. Fix sales and it shows up in delivery. A specialist can
> only fix the one they sell, so they stop where their invoice stops. We own
> the whole engine, which means we go where the constraint is.

The five stages drawn on the homepage: Offer, Traffic, Funnel, Sales, Delivery.

## Three doors

| Lane | Job | What is in it | Owner |
|---|---|---|---|
| `/scale` | demand and revenue | Meta + Google ads, creative, organic, SEO and AI search, funnels, VSLs, CRM, sales process, dashboards | Ryan |
| `/build` | the software that sells | websites, storefronts, marketplaces, CRM builds, automations, internal tools, regulated-category builds | Atif's lane |
| `/ai` | leverage across both, and its own entry | Constraint-First AI Mapping, the five areas, God Mode. This is what the ads sell | the funnel |

Three, not six systems and not five steps, because each lane is a different
*job* rather than a different *task*. The 5 Steps / 12 Systems architecture
(Airtable, locked 2026-05-16) lives underneath `/scale` as detail.

## The engagement shape (no prices, ever)

1. **Install** one of two systems, handed to the team: the Selling System (the
   full engine, what the five growth case studies are) or the AI-Powered Growth
   System (an AI trained on the whole business, wired into the numbers).
2. **Run** it: we run the channels as a team, advise the people who run them, or
   coach the founder who runs everything.
3. **Or start with coaching**: one-on-one with Ryan, the floor if an install is
   not the right first step.

Coaching becomes a sub-service inside each lane later. It has no page and stays
off the front door for now. What anything costs is a conversation, so every
CTA on every page books the same 30-minute AI Growth Discovery Call, the same
GHL calendar and event name as `/assessment`.

## Why the homepage headline is declarative

When `HOMEPAGE-REBUILD.md` was written the homepage was the ad destination and
needed an outcome-led DR hook. The ads now point at `/assessment`. The homepage
catches people who already met us, looked us up, or were referred, and they are
asking what the firm is and whether it can do this, not to be persuaded from
cold. So: "We build and run the entire go-to-market engine." The subhead does
the listing so the headline does not have to.

## Page map

```
/                  the firm: scope, the constraint, three doors, install/run, record, founder, FAQ, book
  /scale           lane page, nine systems, five growth case studies
  /build           lane page, eight kinds of software, ON-SITE / MachineryMaps / Expert Health
  /ai              the AI page (was the 2026-09-14 morning homepage), intact
  /case-studies    Scale section (five) + Build section (two clients + our own)
/assessment        the funnel. NO nav, NO exits, ever. Untouched by any of this.
```

Shared chrome for the four marketing pages: `assets/css/site.css` and
`assets/js/site.js`. Case-study pages keep `case-studies/styles.css`.

## Proof numbers

The reconciled set, matching itsryanfrost.com and the funnel. Nothing else.

| | |
|---|---|
| All Done Consulting | $4.6M, 2022 to 2024 |
| Acquisition Network | $2.9M, 2024 to 2026, exited |
| Malik Consolidated | $1.6M, 2023 to 2024 |
| Smart Sellers Academy | $1.5M, active since Jan 2025 |
| Big Little Gyms | 15 to 189 clients, 12x, $989K |
| **Total** | **$11.5M, seven client engagements** (the five above plus ON-SITE and MachineryMaps) |
| Expert Health | ours, counted separately: 12 products, 9 categories, 48 ad units, live May 2026 |

## Still open

- **`selling-system.html`** and **`/free`** still sell retired offers. Both are
  out of the sitemap. Retire or rebuild.
- **`templates.html`** carries 48 instances of the fabricated proof (Sarah
  Hendrickson, Coaching Collective, Cohort 04, $200M). It is a live page used to
  demo to prospects. Same cleanup the homepage got. Also `TR-01/02/03` is used
  twice (Transformation and Training), which is fine in a gallery and fatal in
  a component library.
- **The five old case-study pages** keep their original em dashes and the
  $135K / $225K run-rate figures in body copy. Pre-existing prose, its own pass.
- **`assets/js/nav.js`** still renders the dead ladder. Only `/free` and the
  archive pages load it.
- **`CALENDAR_URL`** is blank on every page until GHL exists. Each page degrades
  to an explicit empty state plus a mailto.
- **`/api/lead`**: the webhook URL must land as a Cloudflare secret, never in
  this public repo.
- **Design-sync**: this repo has no compiled component library (zero React in
  11,000 lines of `brand.html` + `templates.html`), so the Claude Design import
  cannot ship real components without a build that does not exist yet. Deferred.
  If it happens: clean `templates.html` first, curate ~35 sections, exclude the
  23 pricing / scarcity / guarantee / cohort-bar templates outright.

# Session log

Newest first. One entry per working session. Commit hashes are on `main`.

## 2026-09-17 · Nothing on the site claims more than it can show

**Shipped, all live on weareabundance.com**

| What | Commits |
|---|---|
| Lane heroes got the homepage treatment. Both had a paragraph subhead doing the capability listing, which is the one thing the rules say a subhead must never be. Replaced on both with three scannable "without" lines and a single capability line under them. Headlines unchanged, both were already buyer-first | `c6ebfba` |
| `templates.html`: every fabricated proof item is now a bracketed placeholder, and the page hero says so before the first template. Six testimonials (two named Abundance as the firm that got the result), one invented client persona running through six sections, six invented logo wordmarks under a TRUSTED BY eyebrow, "$200M revenue lifted" and "100+ founders", the retired ladder prices in 32 places, three guarantee sections written as first-person Abundance commitments with Ryan's signature on one, the Cohort 04 countdown and seat row, and an unverifiable founder bio | `829ee6a` |
| `TR-01..03` appeared in both Transformation and Free training. Training becomes `TN-01..03` and all 125 template IDs are unique | `829ee6a` |
| Case-study run rates removed. They were the only proof numbers on the site that failed their own arithmetic: Smart Sellers claimed $225K/mo against $1.5M over about 15 months, which is nearer $100K; Acquisition Network claimed $135K/mo against $2.9M across 2024 to 2026. The reconciled set carries no run rate, so both tiles now show a duration like the other three pages | `89d3c07` |
| Acquisition Network read "Still growing" while the reconciled set, the `/scale` ledger and its own body all say exited. Now says Exited | `89d3c07` |
| 53 dashes across six case-study pages: year ranges to "2022 to 2024", 26 label-and-definition list items to colons, the rest to commas or full stops, and the comma splices that created are fixed | `89d3c07` |
| `/archive/` was live. All four retired sales pages answered 200: Tribe with a $97 to $397 a month price table, Shift at $1,500 a month, Partner with $12M and $2.8M of proof that contradicts the reconciled set. The middleware already 301'd `/tribe`, `/shift` and `/partner`, so it was only closing the front door while the same pages stayed reachable one directory over. `/archive/*` now 301s to the homepage | `89d3c07` |
| `/selling-system` and `/free` retired the same way. `/selling-system` carried a $27,500/mo price table; `/free` sold a $97/mo membership and was the one retired page still missing a noindex. Nothing on the live site linked to either | pending |

**The rule this session applied**

`BRAND.md` says the template library is portable and gets copied into client
repos. That makes invented proof worse than untidy, because it travels. So the
test everywhere was: could a reader take this as a real claim about Abundance or
about a client? If yes, it is now a bracketed placeholder or it is gone. What
stayed is layout dimension only, such as a CPL tile or a before-and-after card,
and those now sit under bracketed attribution.

**Left for Ryan**

- The Selling System and 14-day install vocabulary is still in `templates.html`.
  Renaming it is an offer-ladder decision, not a cleanup one.
- If there are receipts for a peak run rate at handoff, Smart Sellers and
  Acquisition Network can carry it again, labelled peak rather than average.
- `/selling-system` and `/free` are redirected, not rebuilt. The files are still
  in the repo if either should become a real page.

## 2026-09-14 to 2026-09-16 · The site becomes the firm

**Shipped, all live on weareabundance.com**

| What | Commits |
|---|---|
| Homepage rebuilt from the retired Cohort 04 / Selling System page (fabricated proof, prices, countdown) into an honest AI page; then, same day, that page moved to `/ai` and the homepage became the firm: go-to-market systems, three doors (Scale / Build / AI), "the constraint moves" mechanism, install → run → coach shape with no prices | `8a34b1c`, `decbfc9` |
| `/scale` and `/build` lane pages; shared `assets/css/site.css` + `assets/js/site.js` | `decbfc9` |
| Case studies reconciled to the itsryanfrost.com set ($11.5M; AN $2.9M and exited; SSA $1.5M); dead `/#apply` CTAs replaced; three Build case studies written (ON-SITE, MachineryMaps, Expert Health), then HeyFrosty.ai added as the fourth "our own" | `decbfc9`, `c76aa78` |
| God Mode section on the homepage (hub-and-spoke: the A, what it reads, the question you ask it), HeyFrosty as its proof | `c76aa78` |
| Hero rewritten buyer-first after the Whiting comparison: "Predictable growth without you in every loop" + three "without" scan lines; pain-to-state mirror section | `284337f` |
| `.md` files 404 at the domain (OFFERS.md with retired prices was public); repo itself is still public on GitHub | `1f4f206` |
| `DESIGN-SYSTEM-FOR-CLAUDE.md`: one-file design brief with tokens, the three-dial gradient rule, layout rhythm, components, font loading (Typekit `bxi7koh` is domain-locked; Outfit is the stand-in) | `436aa68`, `150aa4f` |
| Privacy policy and terms of service, linked from every footer, noindex, not linked from `/assessment` (no exits) | `075d442`, `86f06a0`, `9a2ceff` |
| `SITE-STRUCTURE.md` replaces `HOMEPAGE-REBUILD.md` | `9b3f399` |

**Elsewhere**

- `abundance-os/research/competitors/john-whiting-bulletproof-entrepreneur.md`: full teardown (ladder, Boardroom mechanics, conversion psychology, side-by-side, take/leave). Also in Airtable: Strategy Docs `recWaD5jmZP3Dx7NS`, Competitor Ads `rec2MQTCyYOEllV9g`. Kept out of this repo because it is public.
- tryabundance.ai double-hop diagnosed: it is GoDaddy domain forwarding (nameservers `domaincontrol.com`), not a Cloudflare zone. Fix is in GoDaddy: forwarding target → `https://weareabundance.com`. Not done, needs Ryan's login.

**Decisions locked (see SITE-STRUCTURE.md)**

- Headlines say what the buyer gets and what they are not buying. Never "we build / we run" as the h1. Never a paragraph subhead.
- Every CTA books the same 30-minute AI Growth Discovery Call. No price anywhere. No countdowns, seats, or fake scarcity.
- Proof is the reconciled set only. Seven client engagements plus two of our own.
- `/assessment` has no exits, ever, including legal links.

**Not done, in priority order**

1. **GoDaddy forwarding for tryabundance.ai** (Ryan, two minutes).
2. **Make this repo private** (Pages works on private repos; `BRAND.md`, `OFFERS.md` are readable on GitHub).
3. **Wiring**: `CALENDAR_URL` blank on every page; `/api/lead` must hold the GHL webhook as a Cloudflare secret; `VIDEO_URL` / Vidalytics / `PIXEL_ID` wait on filming, GHL and the ad account.
4. **Claude Design**: theory-only sync is under an hour (`/design-sync abundance-tribe-website`, user-invoked). `templates.html` is clean now, so the components pass is unblocked.
5. **Legal pages** are a solid template, not legal advice. Lawyer pass before ads scale.
6. **Run-tier offer document** (the Whiting "boardroom doc" format): who it is for / not for, mechanics, phases, price, guarantee. Prices live there, never on the site.

# Session log

Newest first. One entry per working session. Commit hashes are on `main`.

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
2. **Lane heroes** (`/scale` "without hiring a growth team", `/build` "built to be owned") need the same buyer-first treatment as the homepage.
3. **`templates.html`**: 48 fabricated-proof items on a live demo page; `TR-01..03` ID collision. Same cleanup the homepage got.
4. **`/selling-system` and `/free`** still sell retired offers (out of the sitemap). Retire or rebuild.
5. **Old case-study prose**: em dashes and $135K / $225K run rates in body copy.
6. **Make this repo private** (Pages works on private repos; `BRAND.md`, `OFFERS.md` are readable on GitHub).
7. **Wiring**: `CALENDAR_URL` blank on every page; `/api/lead` must hold the GHL webhook as a Cloudflare secret; `VIDEO_URL` / Vidalytics / `PIXEL_ID` wait on filming, GHL and the ad account.
8. **Claude Design**: theory-only sync is under an hour (`/design-sync abundance-tribe-website`, user-invoked); components need `templates.html` cleaned first.
9. **Legal pages** are a solid template, not legal advice. Lawyer pass before ads scale.
10. **Run-tier offer document** (the Whiting "boardroom doc" format): who it is for / not for, mechanics, phases, price, guarantee. Prices live there, never on the site.

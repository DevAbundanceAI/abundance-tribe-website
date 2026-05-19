# brand-os/

Source-of-truth markdown for the Abundance Selling System launch. Backup copy of work that lives canonically in Airtable.

**Created:** 2026-05-19 (after the Codespace crash recovery — same `brand-os/` directory that was referenced in Airtable Deep Dive Doc URLs but never actually got pushed before the crash).

## Files

| File | Purpose |
|---|---|
| [`vsl-v3.md`](./vsl-v3.md) | Selling System Install VSL — v3 draft, ~1,300 words, 12 beats, Cole #2 structural template |
| [`locked-decisions-2026-05-19.md`](./locked-decisions-2026-05-19.md) | All locked decisions made during the 2026-05-19 strategic conversation (ICP, guarantee, financing, Step 1/4 expansions, A/B test plan) |

## Where the source-of-truth lives

- **Brand DNA + Voice + Offer architecture:** Airtable base `Abundance AI - Brand DNA` (`appKg5KqW82kOucCL`)
- **Competitor VSL transcripts + analyses (6 competitors):** Airtable base `Brand OS Master — Shared Intelligence` (`appKbLVhrxH7HqnFd`) → Competitors table
- **Cole Gordon training material (42 records):** Same base → Training Sources table
- **Framework library (9 frameworks):** Airtable base `Brand OS — Script Frameworks` (`apppNA6RFLwp9b4Xe`)
- **Strategic vision docs:** Airtable base `Abundance Strategy & Vision` (`appsVRPzVIMcpXXsG`)

## Why this directory exists

After the 2026-05-18 Codespace crash, we lost the original `brand-os/` codebase (Airtable client, multi-pass copy generator, ad scraper, framework auto-classifier — never pushed to GitHub). The Airtable data survived. This directory begins the git-backed rebuild — starting with markdown source-of-truth for the launch assets, then evolving into the actual SaaS code over the 3-month sprint.

## What does NOT live here

- Live website content (lives in repo root: `index.html`, `brand.html`, `selling-system.html`, etc.)
- Per-client Brand DNA data (lives in Airtable per-client bases)
- The eventual `app.findabundance.ai` SaaS app (will be in a separate `abundance-os` repo)

## Push protocol

When work in this directory is complete, **commit and push immediately**. The original `brand-os/` was lost because nothing was ever pushed. Don't repeat that.

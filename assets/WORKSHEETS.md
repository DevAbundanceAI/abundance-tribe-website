# The Abundance Loop · worksheet system

Three fillable worksheets that live under `/assets/`, save to the browser, and print
straight to PDF. Built as plain HTML, CSS and JS. No framework, no build step.

| Page | Path | Printed pages | localStorage key |
|---|---|---|---|
| Hub | `/assets/` | n/a | n/a |
| Daily Loop | `/assets/daily-loop/` | 1 | `abundance_loop_daily_loop_v1` |
| Weekly Loop | `/assets/weekly-loop/` | 3 | `abundance_loop_weekly_loop_v1` |
| 90-Day Reset | `/assets/90-day-reset/` | 6 | `abundance_loop_reset_90_v1` |

Shared files: `assets/worksheet.css`, `assets/worksheet.js`.

## Why these are a rebuild, not the original artifacts

The source worksheets were multi-megabyte bundles carrying React, a bespoke widget
framework, and base64 font files. They also keyed every saved answer by its position
in the DOM (`f0`, `f1`, `f2`), which means adding or removing a single field silently
corrupts every answer a person had already saved.

These pages key answers by a stable `name` attribute instead, so the page can be
edited later without destroying anyone's history. That property is what makes the
accounts phase below possible.

## Not indexed

Every page carries `<meta name="robots" content="noindex, nofollow">`. Deliberately
**not** done through `robots.txt`, because a `Disallow: /assets/` would also starve
crawlers of the fonts, images and scripts the rest of the site loads from there.

## How the engine works

`worksheet.js` finds the element carrying `data-sheet="<key>"` and manages everything
inside it.

- **Save.** Every input and change event debounces a write 500ms later. The status
  line in the top bar flashes "Saved".
- **Restore.** On load, saved answers are written back by field name.
- **Clear.** The Clear button confirms first, then empties every field and removes the
  stored record.
- **Download PDF.** Saves, then calls `window.print()`. The reader chooses "Save as
  PDF" as the destination. Print CSS drops the nav bar and starts each sheet on a new
  page.
- **Textareas grow** as you type, so what is on screen is what prints.

### Declarative attributes

Add behaviour in the HTML, not in JS.

| Attribute | Does |
|---|---|
| `data-mirror="a1"` | Echoes the value of field `a1` into this element. Used so the evening scorecard shows the morning's actions. Falls back to `data-empty` text. |
| `data-date-from="wk_start" data-add-days="6"` | Fills this date from another date. Stops overriding once a person edits it by hand. |
| `data-count-of="focus" data-count-max="3"` | Counts checked boxes carrying `data-group="focus"` and turns red past the maximum. |
| `data-calc="tri" data-fields="k1,k2,k3"` | Sums kept/half/missed radios, whose values are `1`, `0.5`, `0`. Renders `2.5 / 3`. |
| `data-calc="avg" data-fields="w_body,..."` | Average of 1-10 scales. Renders `7.2 / 10`. |
| `data-calc="value" data-fields="d_align"` | A single 1-10 scale. Renders `8 / 10`. |
| `data-calc="ratio" data-done="c1,c2,c3" data-target="t1,t2,t3"` | Percent of committed reps actually done. |
| `data-calc="delta" data-from="ps_body" data-to="d90_body"` | Signed change between two scores. Renders `+3`. |
| `data-min-lines="3"` | Minimum height of a textarea, in ruled lines. |

## Print budget

A letter page at the margins in `worksheet.css` gives **725 x 958 px** of content.
Every sheet has to fit inside that or it spills onto an extra page. Current slack:

| Sheet | Page | Spare |
|---|---|---|
| Daily | 1 | 51px |
| Weekly | 1 / 2 / 3 | 109 / 148 / 112px |
| 90-Day | 1 / 2 / 3 | 134 / 85 / 85px |
| 90-Day | 4 / 5 / 6 | 160 / 24 / 44px |

The commitment contract on 90-Day page 5 is the tightest. Adding a field there will
push it to a second page.

Two classes control density: `.sheet` is the normal rhythm, `.sheet.dense` tightens
line height and margins for the three pages that carry the most.

When a person types a long answer, the textarea grows and the sheet may run onto a
second page. That is intended. Blocks carry `break-inside: avoid` so nothing gets
sliced through the middle.

## Verifying a change

Both checks live in `scripts/`. They need `puppeteer-core`, a local Chrome, and
`pdfinfo` from poppler-utils. Install puppeteer-core anywhere outside the repo, since
the site itself has no build step and should not gain a dependency for this.

```
python3 -m http.server 8899 --bind 127.0.0.1 &

# per-page print heights against the 958px budget
node scripts/worksheet-measure.cjs

# 56 assertions: save, restore, clear, computed scores, PDF page counts
mkdir -p /tmp/ws && node scripts/worksheet-verify.cjs /tmp/ws
```

Set `CHROME_PATH` if Chrome is somewhere other than the puppeteer cache. The verify
run also asserts the printed page counts (1 / 3 / 6), that no field name is
duplicated, that nothing but the font hosts is contacted, and that no page scrolls
sideways at 390px.

## Next phase: log in and save

Everything currently lives in one browser. Clearing site data loses it. The upgrade
path was designed into the engine.

**Step one, the adapter.** `worksheet.js` opens with a `Store` object holding
`load`, `save` and `clear`. Replace those three bodies with `fetch` calls to
`/api/worksheets` and nothing else in the page changes. Keep localStorage as the
offline fallback and write through to it.

**Step two, the backend.** Cloudflare Pages Functions plus D1, since the site already
runs on Pages. One table:

```sql
CREATE TABLE worksheet_entries (
  user_id    TEXT NOT NULL,
  sheet      TEXT NOT NULL,   -- daily_loop | weekly_loop | reset_90
  period_key TEXT NOT NULL,   -- 2026-09-08 | 2026-W37 | 2026-09-08 (loop start)
  data_json  TEXT NOT NULL,
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, sheet, period_key)
);
```

`period_key` is what makes this worth doing. Because entries are dated, a person gets
history rather than a single overwritten sheet, and streaks, trend lines and
"your execution score over 12 weeks" all fall out of the same rows with no extra
schema. That reporting is the thing worth paying for.

**Step three, auth.** Magic link by email, setting an HttpOnly session cookie. Leads
already flow through GoHighLevel, so the alternative is a signed link from a GHL
workflow, which skips building a login screen at all.

Rough size: one focused session for the adapter plus the Function plus the table, and
a second for the history and trend views.

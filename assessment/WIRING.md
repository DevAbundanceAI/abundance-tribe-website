# /assessment · AI Growth Assessment VSL page

The ad destination for the AI Growth Assessment funnel. One page, one action:
watch the VSL, hit the play-gate, book the 30-minute AI Growth Discovery Call.

Built from VSL v2.29 (`assessment-funnel/vsl-script.html`). The script's own
page-state rules are implemented here, so read that before changing copy.

## Page rules (from the script, do not break)

- **No price anywhere.** Not on the page, not in the video, not in the ads. The
  number is disclosed on the Discovery Call only. The video calls the assessment
  paid; that word is the filter.
- **No nav, and no exits at all.** This is a funnel, not a website page. It must
  never link back to the site. The masthead wordmark used to be a link and is now
  a plain `<span>`; the footer's Home and Case studies links are gone. The only
  remaining `href` that leaves the page is the `mailto:`, kept because it opens a
  mail client rather than navigating away, and a contactable business is worth
  more than the attention it costs. One action per page: book the call.
- Button copy is fixed: **See if you qualify** with the subtext
  **Book your 30-minute AI Growth Discovery Call.**
- The GHL calendar event is named the same, 30 minutes.
- Proof numbers are the reconciled set (Sep 2, 2026) and match itsryanfrost.com.
  Do not add the Brian / $16-per-call stat until it is confirmed defensible.

## The five things to wire

All five live in the `CONFIG` block at the bottom of `index.html`. The page runs
with every one of them blank, so it can be reviewed before anything else exists.

| Key | What it needs | Blocked on |
|---|---|---|
| `VIDEO_URL` | Direct mp4/webm or HLS URL for the VSL | Filming (one take) |
| `POSTER_URL` | Poster frame | Filming |
| `GATE_SECONDS` | Exact second the gate fires | The edit |
| `WEBHOOK_URL` | GHL inbound webhook: creates the contact, fires the instant SMS | GHL build |
| `CALENDAR_URL` | GHL calendar embed for the Discovery Call | GHL build |
| `PIXEL_ID` | Meta pixel. Blank means no pixel code loads at all | Ad account |

### GATE_SECONDS

Set it to the moment right after *"watch how fast it hits your phone"* at the end
of Beat 5, before Beat 6 opens the five areas. Placeholder is 270 (4:30). Get the
real timestamp from the edit; being early costs leads, being late costs the gate.

### Webhook payload

```json
{
  "name": "...", "email": "...", "phone": "...",
  "source": "ai-growth-assessment-vsl",
  "page": "/assessment/",
  "gate_seconds": 270,
  "utm": { "utm_source": "...", "utm_campaign": "..." }
}
```

The SMS is a hard requirement of the script: the viewer is watching the video
that promises the text lands in seconds. Test the round trip before ads run.

If the webhook call fails the viewer is still let through, and the lead is kept
in `localStorage` under `abundance_gate_pending`. Nobody loses the video because
our plumbing broke.

## Gate behaviour

- Fires once, at `GATE_SECONDS`. Name, email and phone all required.
- Seeking past the gate while locked snaps back to it.
- Unlock is remembered in `localStorage` (`abundance_gate_v1`), so a returning
  viewer never hits it twice.
- Fires the Meta `Lead` event on submit. That is the event the campaign
  optimizes for.

## Tested

16 browser assertions cover gate timing, validation, unlock, persistence, the
returning viewer, and that no price string renders. Re-run them against a local
server on any change to the gate.


## The A/B split (required, not optional)

The VSL says out loud: *"The funnel you're sitting in right now? Built with AI.
A/B testing itself as we speak."* The script's own launch gate lists
**"A/B variant running"** as one of three claims that must be true at launch.
So this has to be live whenever the video is.

`functions/assessment/_middleware.js` runs the split at the edge:

- **Variant A** is `index.html` as written, the disqualifier headline that
  mirrors the video's opening line.
- **Variant B** swaps the h1 only, to the outcome-led version. There is no
  second HTML file, so B cannot drift out of sync with the rest of the page.
- 50/50, sticky for 90 days via the `ab_assessment` cookie.
- `?ab=A` or `?ab=B` forces a variant so you can check either one yourself.
- Responses are `Cache-Control: no-store` plus `Vary: Cookie`, because a split
  response must never be served from a shared cache.
- The assigned variant is stamped on `<body data-ab>` and echoed back in the
  `X-AB-Variant` header.

**Attribution.** The gate's webhook payload carries `experiment` and `variant`.
Without those two fields the split runs but tells you nothing, so do not strip
them when wiring `WEBHOOK_URL`.

**On reading the result.** At $50/day this will not reach significance for
months. Detecting a 30% relative lift off a 10% baseline needs about 3,500
visitors. That is fine. The split is running because the video claims it is
running, and the data accumulates in the background for whenever there is
enough of it.


## Vidalytics: why it is a hybrid, not a swap

Vidalytics hosts the VSL and has its own Play Gate, but two facts stop it
being a straight swap:

1. **The gate form is hard-capped.** Name, email, phone and one consent
   checkbox. There is no custom-field or hidden-field facility. So the A/B
   variant and the UTMs cannot ride on their submission, which would blind the
   test at exactly the moment that matters.
2. **Vidalytics does not store the lead.** Their own docs say the gate needs a
   CRM integration or Zapier to save anything. There is no generic webhook, and
   the GoHighLevel integration is tag-based rather than field-based.

What makes the hybrid work is that **their embed is an inline script, not an
iframe**, so every player event is readable straight from the page.

So the split is:

| Job | Owner |
|---|---|
| Player, hosting, gate UI | Vidalytics |
| Retention graph, heatmaps | Vidalytics |
| Meta pixel percent-watched | Vidalytics native integration |
| **The lead write** | **Our handler on `playgate:submit`** |
| Variant + UTM attribution | Ours |
| Funnel events, session recording | PostHog, ours |
| Meta `Lead` on gate submit | Ours. Their pixel integration covers percent-watched only |

Set `VIDALYTICS_EMBED_ID` in CONFIG to switch. Blank keeps the built-in HTML5
player and our own gate, which is what is tested today. Setting it stands our
player and gate down and wires their events instead.

### Plan tier: probably Starter, not Pro

Their GoHighLevel integration is Pro ($79/mo). **We do not need it**, because
our own handler writes the lead. That likely puts this on **Starter at $24/mo**,
which includes Play Gates and the native Meta pixel integration.

One thing that is not documented publicly: whether the player JS API
(`getVidalyticsPlayer`) is available on Starter. The server-side Public API is
tier-gated, the client-side one is not documented either way. **Confirm with
their support before committing**, because the whole hybrid depends on it. If
the JS API turns out to be Pro-only, the choice is Pro at $79 or keeping our
own gate.

Also note their percent-watched pixel events do not carry our A/B variant, which
is why the same milestones are computed again for PostHog off `timeupdate`.


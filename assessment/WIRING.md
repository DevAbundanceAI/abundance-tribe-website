# /assessment · AI Growth Assessment VSL page

The ad destination for the AI Growth Assessment funnel. One page, one action:
watch the VSL, hit the play-gate, book the 30-minute AI Growth Discovery Call.

Built from VSL v2.29 (`assessment-funnel/vsl-script.html`). The script's own
page-state rules are implemented here, so read that before changing copy.

## Page rules (from the script, do not break)

- **No price anywhere.** Not on the page, not in the video, not in the ads. The
  number is disclosed on the Discovery Call only. The video calls the assessment
  paid; that word is the filter.
- **No nav.** One action per page. The masthead wordmark is the only link out.
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

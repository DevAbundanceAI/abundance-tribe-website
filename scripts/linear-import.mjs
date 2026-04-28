#!/usr/bin/env node
/**
 * Bulk-imports the ROADMAP.md task list into Linear as issues.
 *
 * Reads LINEAR_API_KEY and LINEAR_TEAM_NAME from .env.
 * Creates labels (ryan-task, claude-task, decision, content,
 * account-setup, page-build, tracking, infrastructure) if they
 * don't exist, then creates issues with the right priority + labels.
 *
 * Usage:  node scripts/linear-import.mjs
 *
 * Idempotency note: issue titles aren't checked — running this twice
 * will create duplicates. Run once for the first import.
 */

import { readFileSync, existsSync } from "node:fs";

// --- Load .env ----------------------------------------------------------------
function loadEnv(path = ".env") {
  if (!existsSync(path)) return;
  for (const raw of readFileSync(path, "utf8").split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 0) continue;
    const k = line.slice(0, eq).trim();
    const v = line.slice(eq + 1).trim();
    if (!process.env[k]) process.env[k] = v;
  }
}
loadEnv();

const API_KEY = process.env.LINEAR_API_KEY;
const TEAM_NAME = process.env.LINEAR_TEAM_NAME || "Abundance";

if (!API_KEY) {
  console.error("ERROR: LINEAR_API_KEY missing from .env");
  process.exit(1);
}

const ENDPOINT = "https://api.linear.app/graphql";

async function gql(query, variables = {}) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": API_KEY,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    console.error("Linear API error:", JSON.stringify(json.errors, null, 2));
    throw new Error("Linear API call failed");
  }
  return json.data;
}

// --- Define labels ------------------------------------------------------------
const LABELS = [
  { name: "ryan-task",      color: "#F2994A" },  // orange
  { name: "claude-task",    color: "#7C3AED" },  // violet
  { name: "decision",       color: "#EF4444" },  // red
  { name: "content",        color: "#FBBF24" },  // amber
  { name: "account-setup",  color: "#3B82F6" },  // blue
  { name: "page-build",     color: "#10B981" },  // green
  { name: "tracking",       color: "#06B6D4" },  // cyan
  { name: "infrastructure", color: "#6B7280" },  // grey
];

// --- Define tasks -------------------------------------------------------------
// priority: 1=Urgent (P0), 2=High (P1), 3=Medium (P2), 4=Low
// labels: array of label names
const TASKS = [
  // ═════════════════ P0 — RYAN'S DECISIONS (must lock first) ═════════════════
  { title: "Lock final DFY price — confirm $9K", priority: 1, labels: ["ryan-task", "decision"], description: "Confirm $9,000 one-time pricing for the DFY Selling System offer. This is the price ads will close at." },
  { title: "Pick financing partner (Klarna / Affirm / Stripe Capital / PayPal)", priority: 1, labels: ["ryan-task", "decision", "account-setup"], description: "Decision lever: which 0% financing provider lets buyers split $9K into ~$300/mo for 30 months. Apply for the chosen provider." },
  { title: "Get Stripe ready for $9K one-time + $1,500/mo recurring", priority: 1, labels: ["ryan-task", "account-setup"], description: "Stripe products + prices configured for: (1) $9,000 DFY one-time, (2) $1,500/mo Shift continuity. Verify webhook to GHL." },
  { title: "Configure GHL calendar for sales call booking", priority: 1, labels: ["ryan-task", "account-setup"], description: "Calendar that takes ad traffic from /selling-system → 30-min strategy call with Ryan. Confirm intake form fields." },
  { title: "Meta Ads account ready (CAPI keys generated)", priority: 1, labels: ["ryan-task", "account-setup", "tracking"], description: "Meta Business Manager + payment method + Conversion API access token. Pixel ID already exists (1676685240147082 per memory)." },

  // ═════════════════ P0 — RYAN'S CONTENT (cannot ad-launch without) ═════════════════
  { title: "Write 2-3 real case studies for /selling-system", priority: 1, labels: ["ryan-task", "content"], description: "Each case study: client name, business type, before/after revenue numbers, time-to-result, photo, pull-quote. Used in proof section of the VSL funnel." },
  { title: "Write the sales call script (discovery + close)", priority: 1, labels: ["ryan-task", "content"], description: "Discovery questions, objection handlers, close framing. Used by Ryan on every booked call." },
  { title: "Write VSL script for /selling-system hero video", priority: 1, labels: ["ryan-task", "content"], description: "8-15 minute video sales letter. Hook → problem → solution → proof → offer → CTA. This is the single most important content asset for the funnel." },
  { title: "Produce ad creative — 3 hooks, 5 video ads, 5 image ads", priority: 1, labels: ["ryan-task", "content"], description: "Minimum viable creative library for soft-launch. Test 3 hook angles. Iterate based on first week's CTR data." },
  { title: "Write sales call booking page copy", priority: 1, labels: ["ryan-task", "content"], description: "What they're committing to, what to bring/think about, expectations setting. Used on /booked thank-you page." },

  // ═════════════════ P0 — CLAUDE'S PHASE 1 PAGE POLISH ═════════════════
  { title: "Generate iPhone Clarity Audit mockup for Step 01 (Gemini)", priority: 1, labels: ["claude-task", "page-build"], description: "AI-generate a haystock-style iPhone mockup showing a 'Clarity Audit' system map screen. Use the v5 prompt pattern from scripts/prompts/." },
  { title: "Generate MacBook Frameworks mockup for Step 02 (Gemini)", priority: 1, labels: ["claude-task", "page-build"], description: "AI-generate a MacBook product mockup showing the Selling System Builder canvas with module sidebar + Install button." },
  { title: "Add price card section to /selling-system ($9K + financing)", priority: 1, labels: ["claude-task", "page-build"], description: "Pricing section showing $9,000 one-time, with '$300/mo for 30 months on 0% financing' framing. Logo of financing partner. Disclaimer text." },
  { title: "Replace generic 'Apply Now' CTAs with 'Book a Strategy Call'", priority: 1, labels: ["claude-task", "page-build"], description: "All CTAs across /selling-system point to GHL calendar embed. Change copy from 'Apply Now' to 'Book a Strategy Call →'." },
  { title: "Add case studies section to /selling-system (empty templates)", priority: 1, labels: ["claude-task", "page-build"], description: "3-card layout for real case studies. Empty templates ready for Ryan's content. Includes photo, name, before/after stats, pull-quote." },
  { title: "Add FAQ section to /selling-system (8-10 objection handlers)", priority: 1, labels: ["claude-task", "page-build"], description: "Common objections: price, time commitment, guarantee, what's included, who it's for, do I need experience, refund policy, what if I don't have a product, etc." },
  { title: "Add founder credibility section (Ryan + photo + bio)", priority: 1, labels: ["claude-task", "page-build"], description: "'Who's Ryan' section with photo + 2 paragraphs of credibility (years building, results delivered, what makes him qualified)." },
  { title: "Embed GHL calendar on /selling-system for sales call booking", priority: 1, labels: ["claude-task", "infrastructure"], description: "Add the calendar embed in the primary CTA position. Test booking flow end-to-end before ad launch." },
  { title: "Wire conversion tracking (Meta Pixel + GA4 + PostHog) on /selling-system", priority: 1, labels: ["claude-task", "tracking"], description: "Events: page_view, scroll_depth, video_play, video_complete, cta_click, calendar_opened, call_booked. Confirms attribution for ad spend." },
  { title: "Build /booked thank-you page with confirmation + reminders", priority: 1, labels: ["claude-task", "page-build"], description: "Post-booking confirmation page. What to expect on the call, calendar add link, optional reschedule. Triggers email sequence." },

  // ═════════════════ P1 — RYAN'S DECISIONS ═════════════════
  { title: "Lock final Shift price — $1,500/mo target or $997/mo floor", priority: 2, labels: ["ryan-task", "decision"], description: "Continuity offer pricing. Target $1,500/mo, floor $997/mo. Decision matters for backend CAC math." },
  { title: "Confirm Partner pricing — $10K/mo target, $5K floor", priority: 2, labels: ["ryan-task", "decision"], description: "Partner offer is ad-hoc, but should have a default offer to send people to. Locked in: 3-4 month contract." },
  { title: "Lock sales call cadence (30 vs 45 min, day patterns)", priority: 2, labels: ["ryan-task", "decision"], description: "How long is the call, what days/hours are available. Affects show-rate and close-rate." },
  { title: "Decide refund/guarantee terms", priority: 2, labels: ["ryan-task", "decision"], description: "30-day money-back? Conditional guarantee tied to specific outcomes? Affects sales close." },
  { title: "Lock ad copy / hook angles for testing", priority: 2, labels: ["ryan-task", "decision", "content"], description: "Pick 3 hook angles to A/B test. Examples: 'Done-for-you AI selling system' vs 'Replace 5 hires' vs '27 days to first $40K'." },
  { title: "Narrow ICP segmentation per ad creative", priority: 2, labels: ["ryan-task", "decision"], description: "Course creators? Coaches? Agency owners? All three? Different ad creative per segment if pursuing all." },
  { title: "Lock promise specificity ($40K vs 'compounding revenue' etc.)", priority: 2, labels: ["ryan-task", "decision", "content"], description: "Pick one specific promise and stick with it. Pull from real case study data when locked." },

  // ═════════════════ P1 — RYAN'S CONTENT ═════════════════
  { title: "Write 5-10 short attributable testimonials (with photos)", priority: 2, labels: ["ryan-task", "content"], description: "Used across /selling-system + /partner. Real names, real businesses, real photos." },
  { title: "Write booking confirmation email sequence (3 emails)", priority: 2, labels: ["ryan-task", "content"], description: "(1) Immediate booking confirmation. (2) 24hr reminder. (3) 1hr reminder. Set in GHL automation." },

  // ═════════════════ P1 — RYAN'S ACCOUNT SETUP ═════════════════
  { title: "Wire Meta CAPI through GHL", priority: 2, labels: ["ryan-task", "account-setup", "tracking"], description: "Server-side conversion tracking. Open loop in project memory. Better attribution than browser-side pixel only." },
  { title: "Verify PostHog event tracking on /selling-system", priority: 2, labels: ["ryan-task", "account-setup", "tracking"], description: "Confirm all conversion events fire: page_view, scroll, video, cta_click, calendar, booked. Used for funnel analysis." },

  // ═════════════════ P1 — CLAUDE'S PHASE 2/3 PAGE BUILDS ═════════════════
  { title: "Rebuild /partner on new brand system ($10K/mo positioning)", priority: 2, labels: ["claude-task", "page-build"], description: "Full rebuild: matte black + peach + Greycliff. Position as 'Ryan as Head of GTM, 3-4 month contracts, application-only'. Make exclusive-feeling." },
  { title: "Build Partner application flow (form, not direct booking)", priority: 2, labels: ["claude-task", "page-build", "infrastructure"], description: "Vetting form on /apply for Partner candidates. Routes to GHL pipeline for Ryan to review." },
  { title: "Add 'what's NOT included' section to /selling-system", priority: 2, labels: ["claude-task", "page-build"], description: "Preempts the 'is this right for me?' objection. Self-disqualification helps close rate by filtering bad fits." },
  { title: "Add trust band to /selling-system (logos / press / stats)", priority: 2, labels: ["claude-task", "page-build"], description: "Placeholder trust band — fill with real logos when Ryan's content is ready." },
  { title: "Update homepage primary CTA to point at /selling-system", priority: 2, labels: ["claude-task", "page-build"], description: "Minimum viable update — homepage stays mostly same, but primary CTA moves to /selling-system instead of current target." },
  { title: "Soft-launch new visual system on homepage hero", priority: 2, labels: ["claude-task", "page-build"], description: "Apply matte black + peach + Greycliff to homepage hero only. Don't fully rebuild — incremental upgrade." },

  // ═════════════════ P2 — CLAUDE'S PHASE 3+ ═════════════════
  { title: "Rebuild /shift on new brand system as continuity offer", priority: 3, labels: ["claude-task", "page-build"], description: "Reposition: post-DFY continuity, NOT standalone DFY. $1,500/mo with 'first 30 days included with DFY install'." },
  { title: "Hide /tribe from homepage nav links", priority: 3, labels: ["claude-task", "page-build"], description: "Tribe is parked. Remove from primary nav so paid traffic doesn't get distracted." },
  { title: "Add 'Coming Soon — join waitlist' overlay on /tribe", priority: 3, labels: ["claude-task", "page-build"], description: "Old tribe page stays live but with overlay so it doesn't confuse traffic. Captures emails for future organic launch." },
  { title: "Same treatment for /free — coming-soon overlay", priority: 3, labels: ["claude-task", "page-build"], description: "Hub page exists but parked. Overlay + waitlist capture preserves the lead-gen value without distracting from main funnel." },

  // ═════════════════ P2 — STRATEGIC LOOPS ═════════════════
  { title: "Decide: deprecate Unlocked + Freedom, or rebrand", priority: 3, labels: ["ryan-task", "decision"], description: "Likely merged into DFY ($9K) and Shift ($1,500/mo). Deprecate the URLs and redirect, or rebrand into new tiers." },
  { title: "Pick official copy stance — 'Selling System' vs 'DFY Selling System'", priority: 3, labels: ["ryan-task", "decision", "content"], description: "Used inconsistently right now. Pick one and standardize across all pages and ads." },
];

// --- Run ----------------------------------------------------------------------

async function main() {
  console.log("→ Testing API key…");
  const me = await gql(`{ viewer { id name email } }`);
  console.log(`✓ Authed as ${me.viewer.name} (${me.viewer.email})`);

  console.log(`→ Looking up team "${TEAM_NAME}"…`);
  const teamRes = await gql(`
    query($name: String!) {
      teams(filter: { name: { eq: $name } }) {
        nodes { id name key }
      }
    }
  `, { name: TEAM_NAME });
  const team = teamRes.teams.nodes[0];
  if (!team) {
    console.error(`ERROR: No team named "${TEAM_NAME}" found.`);
    console.error("Available teams:");
    const all = await gql(`{ teams { nodes { name key } } }`);
    all.teams.nodes.forEach(t => console.error(`  - "${t.name}" (key: ${t.key})`));
    process.exit(1);
  }
  console.log(`✓ Team: ${team.name} (${team.key})`);

  console.log("→ Ensuring labels exist…");
  const existingLabelsRes = await gql(`
    query($teamId: ID!) {
      issueLabels(filter: { team: { id: { eq: $teamId } } }) {
        nodes { id name }
      }
    }
  `, { teamId: team.id });
  const labelIdByName = {};
  for (const l of existingLabelsRes.issueLabels.nodes) {
    labelIdByName[l.name] = l.id;
  }
  for (const l of LABELS) {
    if (labelIdByName[l.name]) {
      console.log(`  · Found label "${l.name}"`);
      continue;
    }
    const created = await gql(`
      mutation($input: IssueLabelCreateInput!) {
        issueLabelCreate(input: $input) {
          issueLabel { id name }
        }
      }
    `, { input: { teamId: team.id, name: l.name, color: l.color } });
    labelIdByName[l.name] = created.issueLabelCreate.issueLabel.id;
    console.log(`  + Created label "${l.name}"`);
  }

  console.log(`→ Creating ${TASKS.length} issues…`);
  let created = 0;
  for (const t of TASKS) {
    const labelIds = (t.labels || []).map(n => labelIdByName[n]).filter(Boolean);
    const res = await gql(`
      mutation($input: IssueCreateInput!) {
        issueCreate(input: $input) {
          success
          issue { identifier title }
        }
      }
    `, {
      input: {
        teamId: team.id,
        title: t.title,
        description: t.description || "",
        priority: t.priority || 0,
        labelIds,
      },
    });
    if (res.issueCreate.success) {
      console.log(`  ✓ ${res.issueCreate.issue.identifier}: ${t.title}`);
      created++;
    } else {
      console.error(`  ✗ FAILED: ${t.title}`);
    }
  }

  console.log(`\n✓ Done. Created ${created}/${TASKS.length} issues in ${team.name}.`);
  console.log(`Open Linear: https://linear.app/${me.viewer.email.split("@")[0]}/team/${team.key}`);
}

main().catch(err => {
  console.error("Fatal:", err.message);
  process.exit(1);
});

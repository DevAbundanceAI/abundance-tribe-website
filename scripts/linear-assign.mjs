#!/usr/bin/env node
/**
 * 1. Renames the API-key user (developer@tryabundance.ai) → "Abundance AI"
 * 2. Assigns every Linear issue:
 *    - issues with "ryan-task" label   → Frosty
 *    - issues with "claude-task" label → Abundance AI (the renamed dev user)
 *
 * Idempotent — safe to re-run.
 */

import { readFileSync, existsSync } from "node:fs";

function loadEnv(p = ".env") {
  if (!existsSync(p)) return;
  for (const raw of readFileSync(p, "utf8").split("\n")) {
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
if (!API_KEY) { console.error("LINEAR_API_KEY missing"); process.exit(1); }

async function gql(query, variables = {}) {
  const res = await fetch("https://api.linear.app/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": API_KEY },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    console.error("Linear API error:", JSON.stringify(json.errors, null, 2));
    throw new Error("API call failed");
  }
  return json.data;
}

async function main() {
  // 1. Find users
  const usersRes = await gql(`{ users { nodes { id name email displayName } } viewer { id email } }`);
  const users = usersRes.users.nodes;
  const meId = usersRes.viewer.id;

  const frosty = users.find(u => u.email.includes("frosty") || (u.displayName || "").toLowerCase().includes("frost"));
  const aiUser = users.find(u => u.id === meId);

  if (!frosty) { console.error("Frosty user not found"); process.exit(1); }
  if (!aiUser) { console.error("Abundance AI user not found (the API key owner)"); process.exit(1); }

  console.log(`✓ Frosty: ${frosty.displayName || frosty.name} <${frosty.email}>`);
  console.log(`✓ AI user: ${aiUser.displayName || aiUser.name} <${aiUser.email}>`);

  // 2. Rename AI user → "Abundance AI" if not already
  if (aiUser.name !== "Abundance AI") {
    console.log("→ Renaming AI user → 'Abundance AI'…");
    const renameRes = await gql(`
      mutation($input: UserUpdateInput!) {
        userUpdate(id: "${aiUser.id}", input: $input) {
          success user { displayName name }
        }
      }
    `, { input: { displayName: "abundance-ai", name: "Abundance AI" } });
    if (renameRes.userUpdate.success) {
      console.log(`  ✓ Now: ${renameRes.userUpdate.user.displayName}`);
    } else {
      console.log("  ⚠ Rename returned success=false — may need admin permission");
    }
  } else {
    console.log("✓ AI user already named 'Abundance AI'");
  }

  // 3. Find label IDs for ryan-task and claude-task
  const labelsRes = await gql(`{ issueLabels { nodes { id name } } }`);
  const labels = labelsRes.issueLabels.nodes;
  const ryanLabel = labels.find(l => l.name === "ryan-task");
  const claudeLabel = labels.find(l => l.name === "claude-task");

  if (!ryanLabel || !claudeLabel) {
    console.error("Labels missing — run linear-import.mjs first");
    process.exit(1);
  }

  // 4. Get issues with these labels and assign
  console.log("→ Fetching issues with ryan-task / claude-task labels…");

  const issuesRes = await gql(`
    {
      issues(first: 200) {
        nodes {
          id identifier title assignee { id name }
          labels { nodes { id name } }
        }
      }
    }
  `);
  const issues = issuesRes.issues.nodes;

  let ryanCount = 0, claudeCount = 0, skipped = 0;

  for (const issue of issues) {
    const labelNames = issue.labels.nodes.map(l => l.name);
    let targetUserId = null;
    let targetName = null;

    if (labelNames.includes("ryan-task")) {
      targetUserId = frosty.id;
      targetName = "Frosty";
    } else if (labelNames.includes("claude-task")) {
      targetUserId = aiUser.id;
      targetName = "Abundance AI";
    }

    if (!targetUserId) {
      skipped++;
      continue;
    }

    if (issue.assignee?.id === targetUserId) {
      console.log(`  · ${issue.identifier} already assigned to ${targetName}`);
      continue;
    }

    const assignRes = await gql(`
      mutation($id: String!, $input: IssueUpdateInput!) {
        issueUpdate(id: $id, input: $input) {
          success
        }
      }
    `, { id: issue.id, input: { assigneeId: targetUserId } });

    if (assignRes.issueUpdate.success) {
      console.log(`  ✓ ${issue.identifier} → ${targetName}: ${issue.title.slice(0,60)}`);
      if (targetName === "Frosty") ryanCount++; else claudeCount++;
    } else {
      console.error(`  ✗ ${issue.identifier} failed`);
    }
  }

  console.log(`\n✓ Assigned ${ryanCount} to Frosty, ${claudeCount} to Abundance AI (${skipped} unlabeled, skipped).`);
}

main().catch(e => { console.error("Fatal:", e.message); process.exit(1); });

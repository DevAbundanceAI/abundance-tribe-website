#!/usr/bin/env node
/**
 * Image generator using Google Gemini 2.5 Flash Image (a.k.a. "nano banana").
 *
 * Usage:
 *   node scripts/gen-image.mjs "<prompt>" <filename>
 *   node scripts/gen-image.mjs --ref path/to/ref1.png --ref path/to/ref2.png "<prompt>" <filename>
 *
 * Examples:
 *   node scripts/gen-image.mjs "iPhone notification mockup, Stripe payment $5000, dark UI" stripe-notif.png
 *   node scripts/gen-image.mjs --ref assets/images/Ryan-Frost-Profile-Picture.jpg "Ryan against bright peach gradient bg, editorial portrait, square crop" ryan-peach.png
 *
 * Output → assets/images/generated/<filename>
 */

import { GoogleGenAI } from "@google/genai";
import { readFileSync, writeFileSync, existsSync, readFileSync as fsRead } from "node:fs";
import { extname, basename, resolve } from "node:path";

// --- Load .env (no extra dep) -------------------------------------------------
function loadEnv(path = ".env") {
  if (!existsSync(path)) return;
  const txt = fsRead(path, "utf8");
  for (const raw of txt.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim();
    const val = line.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}
loadEnv();

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";

if (!API_KEY) {
  console.error("ERROR: GEMINI_API_KEY missing from .env");
  process.exit(1);
}

// --- Parse args ---------------------------------------------------------------
const args = process.argv.slice(2);
const refs = [];
const positional = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--ref" && args[i + 1]) {
    refs.push(args[++i]);
  } else {
    positional.push(args[i]);
  }
}

if (positional.length < 2) {
  console.error("Usage: node scripts/gen-image.mjs [--ref path]... <prompt> <filename>");
  process.exit(1);
}

const prompt = positional[0];
let outName = positional[1];
if (!extname(outName)) outName += ".png";

const outDir = resolve("assets/images/generated");
const outPath = resolve(outDir, outName);

// --- Build the request --------------------------------------------------------
const ai = new GoogleGenAI({ apiKey: API_KEY });

const parts = [{ text: prompt }];
for (const ref of refs) {
  if (!existsSync(ref)) {
    console.error(`Reference not found: ${ref}`);
    process.exit(1);
  }
  const mime =
    extname(ref).toLowerCase() === ".jpg" || extname(ref).toLowerCase() === ".jpeg"
      ? "image/jpeg"
      : "image/png";
  parts.push({
    inlineData: {
      mimeType: mime,
      data: readFileSync(ref).toString("base64"),
    },
  });
}

console.log(`→ Model: ${MODEL}`);
console.log(`→ Prompt: ${prompt.slice(0, 120)}${prompt.length > 120 ? "…" : ""}`);
if (refs.length) console.log(`→ References: ${refs.join(", ")}`);
console.log(`→ Output: ${outPath}`);
console.log("→ Generating…");

const t0 = Date.now();

let response;
try {
  response = await ai.models.generateContent({
    model: MODEL,
    contents: [{ role: "user", parts }],
  });
} catch (err) {
  console.error("ERROR calling Gemini:", err.message || err);
  process.exit(1);
}

// --- Extract image from response ----------------------------------------------
const candidates = response.candidates || [];
let saved = false;

for (const cand of candidates) {
  for (const part of cand.content?.parts || []) {
    if (part.inlineData?.data) {
      const buf = Buffer.from(part.inlineData.data, "base64");
      writeFileSync(outPath, buf);
      const sizeKb = (buf.length / 1024).toFixed(1);
      const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
      console.log(`✓ Saved ${outPath} (${sizeKb} KB, ${elapsed}s)`);
      saved = true;
    } else if (part.text) {
      console.log(`(model said: ${part.text.slice(0, 200)})`);
    }
  }
}

if (!saved) {
  console.error("ERROR: no image data in response");
  console.error(JSON.stringify(response, null, 2).slice(0, 1000));
  process.exit(1);
}

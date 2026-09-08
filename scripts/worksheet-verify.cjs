const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME = process.env.CHROME_PATH || '/home/codespace/.cache/puppeteer/chrome/linux-152.0.7977.54/chrome-linux64/chrome';
const BASE = 'http://127.0.0.1:8899';
const OUT = process.argv[2];

let pass = 0, fail = 0;
const ok  = (m) => { pass++; console.log('  PASS · ' + m); };
const no  = (m) => { fail++; console.log('  FAIL · ' + m); };
const is  = (c, m) => c ? ok(m) : no(m);

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'],
  });

  const sheets = [
    { slug: 'daily-loop',  key: 'abundance_loop_daily_loop_v1', pages: 1, title: /Daily Loop/ },
    { slug: 'weekly-loop', key: 'abundance_loop_weekly_loop_v1', pages: 3, title: /Weekly Loop/ },
    { slug: '90-day-reset',key: 'abundance_loop_reset_90_v1',   pages: 6, title: /90-Day Reset/ },
  ];

  // ── hub ────────────────────────────────────────────────────────
  console.log('\n[ hub /assets/ ]');
  {
    const page = await browser.newPage();
    const errs = [];
    page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    page.on('pageerror', e => errs.push(String(e)));
    await page.goto(BASE + '/assets/', { waitUntil: 'networkidle0' });
    is(/The Abundance Loop/.test(await page.title()), 'title is set');
    is(await page.$('meta[name="robots"][content*="noindex"]') !== null, 'noindex meta present');
    is((await page.$$('a.card')).length === 3, 'three worksheet cards');
    const hrefs = await page.$$eval('a.card', a => a.map(x => x.getAttribute('href')));
    is(hrefs.join(',') === '/assets/daily-loop/,/assets/weekly-loop/,/assets/90-day-reset/', 'card links point at the three sheets');
    is(errs.length === 0, 'no console errors' + (errs.length ? ' [' + errs[0] + ']' : ''));
    await page.setViewport({ width: 1280, height: 1000, deviceScaleFactor: 1 });
    await page.screenshot({ path: path.join(OUT, 'hub-desktop.png') });
    await page.close();
  }

  for (const s of sheets) {
    console.log('\n[ /assets/' + s.slug + '/ ]');
    const page = await browser.newPage();
    const errs = [], reqs = [];
    page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    page.on('pageerror', e => errs.push(String(e)));
    page.on('request', r => { const u = r.url(); if (!u.startsWith(BASE) && !u.startsWith('data:')) reqs.push(u); });
    page.on('dialog', async d => { await d.accept(); });

    await page.setViewport({ width: 1280, height: 1400, deviceScaleFactor: 1 });
    await page.goto(BASE + '/assets/' + s.slug + '/', { waitUntil: 'networkidle0' });

    is(s.title.test(await page.title()), 'title matches');
    is(await page.$('meta[name="robots"][content*="noindex"]') !== null, 'noindex meta present');
    is((await page.$$('main .sheet')).length === s.pages, `${s.pages} sheet section(s) in the DOM`);
    is(await page.$('[data-clear]') !== null && await page.$('[data-print]') !== null, 'clear + download buttons present');
    const offhost = reqs.filter(u => !/use\.typekit\.net|fonts\.googleapis\.com|fonts\.gstatic\.com|p\.typekit\.net/.test(u));
    is(offhost.length === 0, 'only font hosts contacted' + (offhost.length ? ' [' + offhost[0] + ']' : ''));

    // duplicate name check
    const dupes = await page.evaluate(() => {
      const seen = {}, bad = [];
      document.querySelectorAll('[name]').forEach(el => {
        if (el.type === 'radio') return;
        if (seen[el.name]) bad.push(el.name); else seen[el.name] = 1;
      });
      return bad;
    });
    is(dupes.length === 0, 'no duplicate field names' + (dupes.length ? ' [' + dupes.join(',') + ']' : ''));

    // ── fill every field ────────────────────────────────────────
    const filled = await page.evaluate(() => {
      let n = 0;
      const root = document.querySelector('[data-sheet]');
      root.querySelectorAll('input[type=text], textarea').forEach((el, i) => {
        el.value = 'Test value ' + i;
        el.dispatchEvent(new Event('input', { bubbles: true })); n++;
      });
      root.querySelectorAll('input[type=number]').forEach((el, i) => {
        el.value = String((i % 5) + 3);
        el.dispatchEvent(new Event('input', { bubbles: true })); n++;
      });
      root.querySelectorAll('input[type=date]').forEach(el => {
        if (el.hasAttribute('data-date-from')) return;
        el.value = '2026-09-14';
        el.dispatchEvent(new Event('change', { bubbles: true })); n++;
      });
      // radios: pick the last option of each group
      const groups = {};
      root.querySelectorAll('input[type=radio]').forEach(el => { groups[el.name] = el; });
      Object.values(groups).forEach(el => {
        el.checked = true;
        el.dispatchEvent(new Event('change', { bubbles: true })); n++;
      });
      root.querySelectorAll('input[type=checkbox]').forEach(el => {
        el.checked = true;
        el.dispatchEvent(new Event('change', { bubbles: true })); n++;
      });
      return n;
    });
    is(filled > 10, `filled ${filled} fields`);

    await new Promise(r => setTimeout(r, 900));
    const stored = await page.evaluate(k => localStorage.getItem(k), s.key);
    is(stored && Object.keys(JSON.parse(stored)).length > 10, 'autosaved to localStorage under ' + s.key);

    // derived dates
    const derived = await page.$$eval('[data-date-from]', els => els.map(e => e.value));
    is(derived.every(v => v && v !== ''), 'derived date fields filled' + (derived.length ? ' (' + derived.join(', ') + ')' : ' (none on page)'));

    // computed scores render something other than the placeholder
    const calcs = await page.$$eval('[data-calc]', els => els.map(e => e.getAttribute('data-calc') + '=' + e.textContent.trim()));
    is(calcs.every(c => !/=_|=$/.test(c)), 'all computed scores resolved [' + calcs.join(' ') + ']');

    // mirrors echo their source
    const mirrors = await page.$$eval('[data-mirror]', els => els.map(e => e.textContent.trim()));
    is(mirrors.length === 0 || mirrors.every(t => t.length > 0), 'mirrored labels populated (' + mirrors.length + ')');

    // ── reload keeps everything ─────────────────────────────────
    await page.reload({ waitUntil: 'networkidle0' });
    const after = await page.evaluate(() => {
      const root = document.querySelector('[data-sheet]');
      const t = root.querySelector('input[type=text]');
      const r = root.querySelector('input[type=radio]:checked');
      const a = root.querySelector('textarea');
      return { text: t ? t.value : '', radio: !!r, area: a ? a.value : '' };
    });
    is(after.text.startsWith('Test value') && after.area.startsWith('Test value') && after.radio,
       'values survive a reload');

    // ── print to PDF ────────────────────────────────────────────
    await page.pdf({
      path: path.join(OUT, s.slug + '.pdf'),
      format: 'letter', printBackground: true, preferCSSPageSize: true,
    });

    const pdfPages = require('child_process')
      .execSync('pdfinfo ' + path.join(OUT, s.slug + '.pdf') + " | awk '/^Pages/{print $2}'").toString().trim();
    is(Number(pdfPages) === s.pages, `printed PDF is ${s.pages} page(s) [got ${pdfPages}]`);

    // ── clear ───────────────────────────────────────────────────
    await page.click('[data-clear]');
    await new Promise(r => setTimeout(r, 600));
    const cleared = await page.evaluate(k => {
      const root = document.querySelector('[data-sheet]');
      let dirty = 0;
      root.querySelectorAll('[name]').forEach(el => {
        if (el.type === 'radio' || el.type === 'checkbox') { if (el.checked) dirty++; }
        else if (el.value !== '') dirty++;
      });
      return { dirty, ls: localStorage.getItem(k) };
    }, s.key);
    is(cleared.dirty === 0, 'clear button empties every field');
    is(cleared.ls === null, 'clear button removes the saved record');

    await page.reload({ waitUntil: 'networkidle0' });
    const stillClear = await page.evaluate(() => {
      const root = document.querySelector('[data-sheet]');
      let dirty = 0;
      root.querySelectorAll('[name]').forEach(el => {
        if (el.type === 'radio' || el.type === 'checkbox') { if (el.checked) dirty++; }
        else if (el.value !== '') dirty++;
      });
      return dirty;
    });
    is(stillClear === 0, 'still clear after reload');

    // screenshots
    await page.screenshot({ path: path.join(OUT, s.slug + '-desktop.png'), fullPage: true });
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
    await page.reload({ waitUntil: 'networkidle0' });
    const hscroll = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    is(hscroll <= 1, 'no horizontal scroll at 390px (' + hscroll + 'px)');
    await page.screenshot({ path: path.join(OUT, s.slug + '-mobile.png'), fullPage: true });
    await page.close();
  }

  await browser.close();
  console.log('\n────────────────────────');
  console.log(`${pass} passed · ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });

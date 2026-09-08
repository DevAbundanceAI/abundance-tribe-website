const puppeteer = require('puppeteer-core');
const CHROME = process.env.CHROME_PATH || '/home/codespace/.cache/puppeteer/chrome/linux-152.0.7977.54/chrome-linux64/chrome';
const BASE = 'http://127.0.0.1:8899';
// letter, 13mm top/bottom + 12mm left/right margins, at 96dpi
const W = Math.round((215.9 - 24) / 25.4 * 96);
const H = Math.round((279.4 - 26) / 25.4 * 96);

(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  console.log(`budget per page: ${W}w x ${H}h px\n`);
  for (const slug of ['daily-loop', 'weekly-loop', '90-day-reset']) {
    const p = await b.newPage();
    await p.setViewport({ width: W, height: H });
    await p.goto(BASE + '/assets/' + slug + '/', { waitUntil: 'networkidle0' });
    await p.emulateMediaType('print');
    await p.evaluate(() => {
      document.querySelectorAll('textarea').forEach(t => {
        t.style.height = 'auto';
        const min = parseInt(t.getAttribute('data-min-lines') || '2', 10);
        t.style.height = (Math.max(min, Math.ceil(t.scrollHeight / 30)) * 30 + 3) + 'px';
      });
    });
    const rows = await p.evaluate(() => Array.from(document.querySelectorAll('.sheet')).map(s => ({
      h: Math.round(s.getBoundingClientRect().height),
      t: (s.querySelector('.title') || {}).textContent || '',
    })));
    console.log(slug);
    rows.forEach((r, i) => {
      const over = r.h - H;
      console.log(`  p${i + 1} ${String(r.h).padStart(5)}px  ${over > 0 ? 'OVER by ' + over : 'fits, ' + (-over) + 'px spare'}   ${r.t.trim().slice(0, 34)}`);
    });
    await p.close();
  }
  await b.close();
})();

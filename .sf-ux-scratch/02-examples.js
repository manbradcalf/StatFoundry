const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const consoleMsgs = [];
  page.on('console', m => { if (m.type() === 'error') consoleMsgs.push(`[error] ${m.text().slice(0, 300)}`); });
  page.on('pageerror', e => consoleMsgs.push(`[pageerror] ${e.message.slice(0, 300)}`));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Expand example searches
  await page.click('text=Example Searches');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'shots/02-examples-open.png', fullPage: true });
  const examples = await page.evaluate(() => document.body.innerText);
  console.log('--- BODY AFTER EXPAND ---');
  console.log(examples.slice(0, 2500));

  // Click first example search (try common selectors)
  const candidates = await page.$$eval('[class*=example] button, [class*=Example] button, li, [role=listitem]', els =>
    els.map(e => e.innerText.trim().replace(/\s+/g,' ').slice(0,100)).filter(Boolean));
  console.log('CANDIDATES:', JSON.stringify(candidates.slice(0, 20), null, 2));
  console.log('CONSOLE:', JSON.stringify(consoleMsgs));
  await browser.close();
})();

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const consoleMsgs = [];
  const netErrors = [];
  page.on('console', m => { if (m.type() === 'error') consoleMsgs.push(`[error] ${m.text().slice(0, 300)}`); });
  page.on('pageerror', e => consoleMsgs.push(`[pageerror] ${e.message.slice(0, 300)}`));
  page.on('response', r => { if (r.status() >= 400) netErrors.push(`${r.status()} ${r.url()}`); });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.click('text=Example Searches');
  await page.waitForTimeout(500);

  const t0 = Date.now();
  await page.click('button:has-text("Run Search")'); // first one: 100+ yard rushing games 2024
  // capture loading state quickly
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'shots/03-loading.png' });
  // wait for results
  await page.waitForTimeout(6000);
  const elapsed = Date.now() - t0;
  await page.screenshot({ path: 'shots/03-results-viewport.png' });
  await page.screenshot({ path: 'shots/03-results-full.png', fullPage: true });

  const info = await page.evaluate(() => {
    const tables = [...document.querySelectorAll('table')];
    return {
      url: location.href,
      tableCount: tables.length,
      firstTableHeaders: tables[0] ? [...tables[0].querySelectorAll('th')].map(th => th.innerText.trim()) : [],
      rowCount: tables[0] ? tables[0].querySelectorAll('tbody tr').length : 0,
      firstRow: tables[0] && tables[0].querySelector('tbody tr') ? tables[0].querySelector('tbody tr').innerText.replace(/\s+/g,' | ').slice(0,300) : null,
      visibleText: document.body.innerText.slice(0, 1200)
    };
  });
  console.log('elapsed ms ~', elapsed);
  console.log(JSON.stringify(info, null, 2));
  console.log('CONSOLE:', JSON.stringify(consoleMsgs));
  console.log('NET ERRORS:', JSON.stringify(netErrors));
  await browser.close();
})();

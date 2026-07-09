const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const consoleMsgs = [];
  page.on('console', m => { if (m.type() === 'error') consoleMsgs.push(`[error] ${m.text().slice(0, 200)}`); });
  page.on('pageerror', e => consoleMsgs.push(`[pageerror] ${e.message.slice(0, 200)}`));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.click('text=Example Searches');
  await page.waitForTimeout(400);
  await page.click('button:has-text("Run Search")');
  await page.waitForTimeout(6000);

  // open the Columns dropdown
  try {
    await page.click('text=Columns');
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'shots/04-columns-dropdown.png', fullPage: true });
    const dd = await page.evaluate(() => {
      const labels = [...document.querySelectorAll('label, [role=menuitem], [role=option], input[type=checkbox]')];
      return labels.map(l => (l.innerText || l.parentElement?.innerText || '').trim().replace(/\s+/g,' ')).filter(Boolean).slice(0, 30);
    });
    console.log('COLUMNS DROPDOWN:', JSON.stringify(dd, null, 2));
  } catch (e) { console.log('columns dropdown fail:', e.message); }
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  // try clicking a column header to sort
  try {
    await page.click('th:has-text("Rushing Yards")');
    await page.waitForTimeout(800);
    const firstRow = await page.evaluate(() => document.querySelector('tbody tr')?.innerText.replace(/\s+/g,' | '));
    console.log('after header click, first row:', firstRow);
    await page.screenshot({ path: 'shots/04-sort-attempt.png' });
  } catch (e) { console.log('sort fail:', e.message); }

  // Save button while logged out
  try {
    await page.click('button:has-text("Save")');
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'shots/04-save-logged-out.png' });
    const modal = await page.evaluate(() => document.body.innerText.slice(0, 800));
    console.log('AFTER SAVE CLICK text:', modal.replace(/\n/g, ' / ').slice(0, 600));
  } catch (e) { console.log('save click fail:', e.message); }

  // Export CSV while logged out
  try {
    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 4000 }).catch(() => null),
      page.click('text=Export CSV')
    ]);
    await page.waitForTimeout(500);
    console.log('download object:', download ? await download.suggestedFilename() : 'none');
    await page.screenshot({ path: 'shots/04-export-csv.png' });
  } catch (e) { console.log('export fail:', e.message); }

  console.log('CONSOLE:', JSON.stringify(consoleMsgs));
  await browser.close();
})();

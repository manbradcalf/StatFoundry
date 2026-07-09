const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const consoleMsgs = [];
  page.on('console', m => { if (m.type() === 'error') consoleMsgs.push(`[error] ${m.text().slice(0, 200)}`); });
  page.on('pageerror', e => consoleMsgs.push(`[pageerror] ${e.message.slice(0, 200)}`));
  const apiCalls = [];
  page.on('request', r => { if (r.url().includes(':8000')) apiCalls.push(r.method() + ' ' + r.url().slice(0, 200)); });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const input = page.locator('input[type=text]').first();

  async function buildQuery(nameValue) {
    // entity
    await input.click();
    await input.pressSequentially('player games', { delay: 40 });
    await page.waitForTimeout(1100);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    // name filter
    await input.click();
    await input.pressSequentially('name', { delay: 40 });
    await page.waitForTimeout(1100);
    await page.locator('.suggestion-item', { hasText: /^name \(PlayerGame\)/ }).first().click();
    await page.waitForTimeout(500);
    const valInput = page.locator('[class*=modal] input, [role=dialog] input').last();
    await valInput.fill(nameValue);
    await page.locator('[class*=modal] button:has-text("Save")').last().click();
    await page.waitForTimeout(500);
    // search -> columns modal
    await page.locator('button.primary-button:has-text("Search"), button:has-text("Search")').nth(0).click();
    await page.waitForTimeout(1000);
    // quick select passing stats
    await page.click('text=Passing Stats');
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'shots/10-columns-quickselect.png' });
    await page.locator('button:has-text("Save (")').click();
    await page.waitForTimeout(6000);
  }

  await buildQuery('Patrick Mahomes');
  await page.screenshot({ path: 'shots/10-results-patrick-mahomes.png', fullPage: true });
  const res = await page.evaluate(() => ({
    rows: document.querySelectorAll('tbody tr').length,
    snippet: document.body.innerText.slice(0, 1000)
  }));
  console.log('rows for "Patrick Mahomes":', res.rows);
  console.log(res.snippet.replace(/\n/g, ' / ').slice(0, 800));
  console.log('API CALLS:', JSON.stringify(apiCalls, null, 2));
  console.log('CONSOLE:', JSON.stringify(consoleMsgs));
  await browser.close();
})();

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const consoleMsgs = [];
  page.on('console', m => { if (m.type() === 'error') consoleMsgs.push(`[error] ${m.text().slice(0, 300)}`); });
  page.on('pageerror', e => consoleMsgs.push(`[pageerror] ${e.message.slice(0, 300)}`));
  const apiCalls = [];
  page.on('response', async r => {
    if (r.url().includes('8000')) {
      let body = '';
      try { body = (await r.text()).slice(0, 300); } catch {}
      apiCalls.push(`${r.status()} ${r.request().method()} ${r.url().slice(0, 150)} BODY: ${body}`);
    }
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const input = page.locator('input[type=text]').first();

  async function run(nameValue, shotPrefix) {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await input.click();
    await input.pressSequentially('player games', { delay: 30 });
    await page.waitForTimeout(1000);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(400);
    await input.click();
    await input.pressSequentially('name', { delay: 30 });
    await page.waitForTimeout(1000);
    await page.locator('.suggestion-item', { hasText: /^name \(PlayerGame\)/ }).first().click();
    await page.waitForTimeout(400);
    await page.locator('[class*=modal] input').last().fill(nameValue);
    await page.locator('[class*=modal] button:has-text("Save")').last().click();
    await page.waitForTimeout(400);
    // first Search click -> columns modal
    await page.locator('button:has-text("Search")').first().click();
    await page.waitForTimeout(800);
    const modalVisible = await page.locator('text=Select Columns to Return').count();
    if (modalVisible) {
      await page.click('text=Passing Stats');
      await page.waitForTimeout(300);
      await page.locator('button:has-text("Save (")').click();
      await page.waitForTimeout(800);
    }
    // second Search click -> actually run?
    await page.locator('button:has-text("Search")').first().click();
    await page.waitForTimeout(7000);
    await page.screenshot({ path: `shots/${shotPrefix}.png`, fullPage: true });
    const res = await page.evaluate(() => ({
      rows: document.querySelectorAll('tbody tr').length,
      hasTable: !!document.querySelector('table'),
      bodySnippet: document.body.innerText.replace(/\n/g, ' / ').slice(0, 600)
    }));
    console.log(`=== "${nameValue}" rows:`, res.rows, 'hasTable:', res.hasTable);
    console.log(res.bodySnippet);
  }

  await run('Patrick Mahomes', '11-patrick-mahomes');
  await run('P.Mahomes', '11-p-mahomes');

  console.log('API CALLS:', JSON.stringify(apiCalls, null, 2));
  console.log('CONSOLE:', JSON.stringify(consoleMsgs));
  await browser.close();
})();

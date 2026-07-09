const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const apiCalls = [];
  page.on('response', async r => {
    if (r.url().includes('8000')) {
      let body = '';
      try { body = (await r.text()).slice(0, 400); } catch {}
      apiCalls.push(`${r.status()} ${r.url().slice(0, 120)} BODY: ${body}`);
    }
  });

  const input = () => page.locator('input[type=text]').first();

  async function run(field, value, shotPrefix) {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await input().click();
    await input().pressSequentially('player games', { delay: 30 });
    await page.waitForTimeout(1000);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(400);
    await input().click();
    await input().pressSequentially(field, { delay: 30 });
    await page.waitForTimeout(1100);
    await page.locator('.suggestion-item', { hasText: new RegExp(`^${field} \\(PlayerGame\\)`) }).first().click();
    await page.waitForTimeout(400);
    await page.locator('[class*=modal] input').last().fill(value);
    await page.locator('[class*=modal] button:has-text("Save")').last().click();
    await page.waitForTimeout(400);
    await page.locator('button:has-text("Search")').first().click();
    await page.waitForTimeout(800);
    if (await page.locator('text=Select Columns to Return').count()) {
      await page.click('text=Passing Stats');
      await page.waitForTimeout(300);
      await page.locator('button:has-text("Save (")').click();
      await page.waitForTimeout(600);
    }
    await page.locator('button:has-text("Search")').first().click();
    await page.waitForTimeout(7000);
    await page.screenshot({ path: `shots/${shotPrefix}.png`, fullPage: true });
    const res = await page.evaluate(() => ({
      rows: document.querySelectorAll('tbody tr').length,
      snippet: document.body.innerText.replace(/\n/g, ' / ').slice(200, 700)
    }));
    console.log(`=== ${field}="${value}" rows:`, res.rows);
    console.log(res.snippet);
  }

  await run('player_display_name', 'Patrick Mahomes', '12-display-name');
  console.log('API CALLS:', JSON.stringify(apiCalls, null, 2));
  await browser.close();
})();

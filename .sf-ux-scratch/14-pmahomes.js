const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const input = page.locator('input[type=text]').first();

  await input.click();
  await input.pressSequentially('player games', { delay: 30 });
  await page.waitForTimeout(1000);
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(400);

  await input.click();
  await input.pressSequentially('player_name', { delay: 30 });
  await page.waitForTimeout(1100);
  await page.locator('.suggestion-item', { hasText: /^player_name \(PlayerGame\)/ }).first().click();
  await page.waitForTimeout(400);
  await page.locator('[class*=modal] input').last().fill('P.Mahomes');
  await page.locator('[class*=modal] button:has-text("Save")').last().click();
  await page.waitForTimeout(400);

  await page.locator('button:has-text("Search")').first().click();
  await page.waitForTimeout(800);
  if (await page.locator('text=Select Columns to Return').count()) {
    await page.click('text=Passing Stats');
    await page.waitForTimeout(200);
    await page.click('text=Identifying Info');
    await page.waitForTimeout(300);
    await page.locator('button:has-text("Save (")').click();
    await page.waitForTimeout(600);
  }
  await page.locator('button:has-text("Search")').first().click();
  await page.waitForTimeout(7000);
  await page.screenshot({ path: 'shots/14-pmahomes-results.png', fullPage: true });
  const res = await page.evaluate(() => ({
    rows: document.querySelectorAll('tbody tr').length,
    headers: [...document.querySelectorAll('th')].map(t => t.innerText.trim()),
    firstRow: document.querySelector('tbody tr')?.innerText.replace(/\s+/g, ' | '),
    totals: document.body.innerText.includes('results') ? document.body.innerText.match(/[\d,]+ results.*/)?.[0] : null
  }));
  console.log(JSON.stringify(res, null, 2));
  await browser.close();
})();

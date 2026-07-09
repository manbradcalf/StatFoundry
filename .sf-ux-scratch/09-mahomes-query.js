const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const consoleMsgs = [];
  page.on('console', m => { if (m.type() === 'error') consoleMsgs.push(`[error] ${m.text().slice(0, 200)}`); });
  page.on('pageerror', e => consoleMsgs.push(`[pageerror] ${e.message.slice(0, 200)}`));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const input = page.locator('input[type=text]').first();

  async function addNameFilter(value) {
    await input.click();
    await input.pressSequentially('name', { delay: 40 });
    await page.waitForTimeout(1200);
    await page.locator('.suggestion-item', { hasText: /^name \(PlayerGame\)/ }).first().click();
    await page.waitForTimeout(600);
    const valInput = page.locator('[class*=modal] input, [role=dialog] input').last();
    await valInput.fill('');
    await valInput.fill(value);
    await page.locator('[class*=modal] button:has-text("Save"), [role=dialog] button:has-text("Save")').last().click();
    await page.waitForTimeout(600);
  }

  // Player Games entity
  await input.click();
  await input.pressSequentially('player games', { delay: 40 });
  await page.waitForTimeout(1200);
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(500);

  await addNameFilter('Patrick Mahomes');
  await page.screenshot({ path: 'shots/09-chain-built.png' });

  await page.click('button:has-text("Search")');
  await page.waitForTimeout(6000);
  await page.screenshot({ path: 'shots/09-results-fullname.png', fullPage: true });
  const res1 = await page.evaluate(() => ({
    rows: document.querySelectorAll('tbody tr').length,
    text: document.body.innerText.slice(0, 900)
  }));
  console.log('FULL NAME rows:', res1.rows);
  console.log(res1.text.replace(/\n/g, ' / ').slice(0, 700));

  console.log('CONSOLE:', JSON.stringify(consoleMsgs));
  await browser.close();
})();

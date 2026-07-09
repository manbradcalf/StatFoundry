const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.click('text=Example Searches');
  await page.waitForTimeout(400);
  await page.click('button:has-text("Run Search")');
  await page.waitForTimeout(5000);

  // hover and click the rushing_yards chunk pill
  const pill = page.locator('text=rushing_yards >= 100').first();
  await pill.hover();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'shots/17-pill-hover.png' });
  await pill.click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'shots/17-pill-click.png' });
  const modal = await page.evaluate(() => {
    const m = document.querySelector('[class*=modal], [role=dialog]');
    return m ? m.innerText.replace(/\s+/g, ' ').slice(0, 300) : 'no modal';
  });
  console.log('pill click ->', modal);
  // close if modal
  const cancel = page.locator('button:has-text("Cancel")');
  if (await cancel.count()) await cancel.click();
  await page.waitForTimeout(400);

  // Enter key in search input — does Enter select first suggestion without arrow?
  const input = page.locator('input[type=text]').first();
  await input.click();
  await input.pressSequentially('season', { delay: 40 });
  await page.waitForTimeout(1100);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(700);
  await page.screenshot({ path: 'shots/17-enter-no-arrow.png' });
  const chain = await page.evaluate(() => document.querySelector('[class*=chain], [class*=breadcrumb]')?.innerText.replace(/\s+/g, ' ').slice(0, 200));
  console.log('chain after Enter:', chain);
  await browser.close();
})();

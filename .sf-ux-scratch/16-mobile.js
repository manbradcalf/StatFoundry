const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const consoleMsgs = [];
  page.on('console', m => { if (m.type() === 'error') consoleMsgs.push(`[error] ${m.text().slice(0, 200)}`); });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'shots/16-mobile-landing.png' });

  // horizontal overflow check
  const overflow = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth
  }));
  console.log('overflow check:', JSON.stringify(overflow));

  // run example search
  await page.click('text=Example Searches');
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'shots/16-mobile-examples.png' });
  await page.click('button:has-text("Run Search")');
  await page.waitForTimeout(7000);
  await page.screenshot({ path: 'shots/16-mobile-results.png' });
  await page.screenshot({ path: 'shots/16-mobile-results-full.png', fullPage: true });

  const overflow2 = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
    tableVisible: !!document.querySelector('table')
  }));
  console.log('after results:', JSON.stringify(overflow2));

  // typing on mobile
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const input = page.locator('input[type=text]').first();
  await input.click();
  await input.pressSequentially('player games', { delay: 40 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'shots/16-mobile-suggestions.png' });

  console.log('CONSOLE:', JSON.stringify(consoleMsgs));
  await browser.close();
})();

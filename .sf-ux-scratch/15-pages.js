const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const consoleMsgs = [];
  page.on('console', m => { if (m.type() === 'error') consoleMsgs.push(`[error] ${m.text().slice(0, 250)}`); });
  page.on('pageerror', e => consoleMsgs.push(`[pageerror] ${e.message.slice(0, 250)}`));

  const pages = [
    ['/video-tutorials', '15-tutorials'],
    ['/faqs', '15-faqs'],
    ['/stats', '15-stats'],
    ['/about', '15-about'],
    ['/account', '15-account'],
  ];
  for (const [path, shot] of pages) {
    await page.goto('http://localhost:3000' + path, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `shots/${shot}.png`, fullPage: true });
    const text = await page.evaluate(() => document.body.innerText.replace(/\n+/g, ' / ').slice(0, 1200));
    console.log(`=== ${path} ===`);
    console.log(text);
    console.log();
  }

  // login modal
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.click('button:has-text("Login")');
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'shots/15-login-modal.png' });
  console.log('=== LOGIN MODAL ===');
  console.log(await page.evaluate(() => {
    const m = document.querySelector('[class*=modal], [role=dialog]');
    return m ? m.innerText.replace(/\n+/g, ' / ').slice(0, 600) : 'no modal found';
  }));

  console.log('CONSOLE ERRORS:', JSON.stringify(consoleMsgs, null, 2));
  await browser.close();
})();

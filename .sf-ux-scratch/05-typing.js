const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const consoleMsgs = [];
  page.on('console', m => { if (m.type() === 'error') consoleMsgs.push(`[error] ${m.text().slice(0, 200)}`); });
  page.on('pageerror', e => consoleMsgs.push(`[pageerror] ${e.message.slice(0, 200)}`));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const input = page.locator('input[type=text]').first();

  async function typeAndCapture(text, name) {
    await input.click();
    await input.fill('');
    await page.waitForTimeout(300);
    await input.pressSequentially(text, { delay: 60 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `shots/05-${name}.png` });
    const sugg = await page.evaluate(() => {
      const els = [...document.querySelectorAll('[class*=suggestion], [class*=dropdown] li, [role=option], [class*=autocomplete] li, ul li')];
      return els.map(e => (e.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 120)).filter(Boolean).slice(0, 15);
    });
    console.log(`--- "${text}" suggestions:`, JSON.stringify(sugg, null, 2));
  }

  await typeAndCapture('Derrick', 'derrick');
  await typeAndCapture('Mahomes', 'mahomes');
  await typeAndCapture('rushing yards', 'rushing-yards');
  await typeAndCapture('meanest quarterback', 'nonsense');

  console.log('CONSOLE:', JSON.stringify(consoleMsgs));
  await browser.close();
})();

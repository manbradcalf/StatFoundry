const { chromium } = require('playwright');

async function sugg(page) {
  return page.$$eval('.suggestion-item', els => els.map(e => (e.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 140)));
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const consoleMsgs = [];
  page.on('console', m => { if (m.type() === 'error') consoleMsgs.push(`[error] ${m.text().slice(0, 200)}`); });
  page.on('pageerror', e => consoleMsgs.push(`[pageerror] ${e.message.slice(0, 200)}`));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const input = page.locator('input[type=text]').first();

  // Build: Player Games
  await input.click();
  await input.pressSequentially('player games', { delay: 40 });
  await page.waitForTimeout(1200);
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(600);

  // Filter by name
  await page.keyboard.type('name', { delay: 50 });
  await page.waitForTimeout(1300);
  console.log('name suggestions:', JSON.stringify(await sugg(page), null, 2));
  await page.screenshot({ path: 'shots/08-name-suggestions.png' });
  // click the "name (PlayerGame)" suggestion
  const nameSugg = page.locator('.suggestion-item', { hasText: /\bname\b/ }).first();
  await nameSugg.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'shots/08-after-name-click.png' });
  console.log('after name click, body top:', (await page.evaluate(() => document.body.innerText)).slice(0, 600).replace(/\n/g, ' / '));

  // If a modal appeared, dump its content
  const modalText = await page.evaluate(() => {
    const m = document.querySelector('[class*=modal], [role=dialog]');
    return m ? m.innerText.replace(/\s+/g, ' ').slice(0, 500) : null;
  });
  console.log('MODAL:', modalText);

  // Try typing a value
  await page.keyboard.type('Patrick Mahomes', { delay: 40 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'shots/08-typed-value.png' });
  console.log('value suggestions:', JSON.stringify(await sugg(page), null, 2));

  // dump any visible inputs/selects in modal
  const controls = await page.evaluate(() => [...document.querySelectorAll('select, input')].map(c => `${c.tagName} ${c.type || ''} placeholder="${c.placeholder || ''}" value="${c.value}"`));
  console.log('CONTROLS:', JSON.stringify(controls, null, 2));

  console.log('CONSOLE:', JSON.stringify(consoleMsgs));
  await browser.close();
})();

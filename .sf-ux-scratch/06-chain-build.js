const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const consoleMsgs = [];
  page.on('console', m => { if (m.type() === 'error') consoleMsgs.push(`[error] ${m.text().slice(0, 200)}`); });
  page.on('pageerror', e => consoleMsgs.push(`[pageerror] ${e.message.slice(0, 200)}`));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const input = page.locator('input[type=text]').first();

  // Step 1: focus input — does dropdown appear on empty focus?
  await input.click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'shots/06-empty-focus.png' });

  // Step 2: type "player" and use keyboard: ArrowDown + Enter
  await input.pressSequentially('player', { delay: 50 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'shots/06-player-typed.png' });
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'shots/06-arrowdown.png' });
  await page.keyboard.press('Enter');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'shots/06-after-enter.png' });
  const chain1 = await page.evaluate(() => document.body.innerText.split('\n').slice(0, 25).join(' / '));
  console.log('after enter:', chain1.slice(0, 500));

  // Step 3: now type "mahomes" to see second-level suggestions
  await input.click().catch(()=>{});
  await page.keyboard.type('mahomes', { delay: 60 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'shots/06-mahomes-level2.png' });
  const sugg2 = await page.evaluate(() => {
    const els = [...document.querySelectorAll('ul li')];
    return els.map(e => (e.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 120)).filter(Boolean).slice(0, 15);
  });
  console.log('mahomes level2 suggestions:', JSON.stringify(sugg2, null, 2));

  // Step 4: clear, try "rushing" at level 2
  for (let i = 0; i < 10; i++) await page.keyboard.press('Backspace');
  await page.keyboard.type('rushing', { delay: 60 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'shots/06-rushing-level2.png' });
  const sugg3 = await page.evaluate(() => {
    const els = [...document.querySelectorAll('ul li')];
    return els.map(e => (e.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 120)).filter(Boolean).slice(0, 15);
  });
  console.log('rushing level2 suggestions:', JSON.stringify(sugg3, null, 2));

  console.log('CONSOLE:', JSON.stringify(consoleMsgs));
  await browser.close();
})();

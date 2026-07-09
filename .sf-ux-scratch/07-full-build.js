const { chromium } = require('playwright');

async function suggestions(page) {
  return page.evaluate(() => {
    const els = [...document.querySelectorAll('ul li')];
    return els.map(e => (e.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 140)).filter(Boolean).slice(0, 20);
  });
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const consoleMsgs = [];
  page.on('console', m => { if (m.type() === 'error') consoleMsgs.push(`[error] ${m.text().slice(0, 200)}`); });
  page.on('pageerror', e => consoleMsgs.push(`[pageerror] ${e.message.slice(0, 200)}`));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const input = page.locator('input[type=text]').first();

  // Action 1-2: type "player games", select entity
  await input.click();
  await input.pressSequentially('player games', { delay: 40 });
  await page.waitForTimeout(1200);
  console.log('L1:', JSON.stringify(await suggestions(page)));
  await page.screenshot({ path: 'shots/07-step1-playergames.png' });
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'shots/07-step2-entity-selected.png' });

  // Action 3: type "mahomes" — can I filter by player name here?
  await page.keyboard.type('mahomes', { delay: 50 });
  await page.waitForTimeout(1400);
  console.log('L2 mahomes:', JSON.stringify(await suggestions(page)));
  await page.screenshot({ path: 'shots/07-step3-mahomes.png' });
  // clear
  for (let i = 0; i < 8; i++) await page.keyboard.press('Backspace');
  await page.waitForTimeout(400);

  // type "passing" instead
  await page.keyboard.type('passing', { delay: 50 });
  await page.waitForTimeout(1400);
  console.log('L2 passing:', JSON.stringify(await suggestions(page)));
  await page.screenshot({ path: 'shots/07-step4-passing.png' });

  // select passing_yards if present
  const py = page.locator('ul li', { hasText: 'passing_yards' }).first();
  if (await py.count()) {
    await py.click();
    await page.waitForTimeout(900);
    await page.screenshot({ path: 'shots/07-step5-after-field-click.png' });
    console.log('after field click body:', (await page.evaluate(() => document.body.innerText)).slice(0, 700).replace(/\n/g, ' / '));
  } else {
    console.log('passing_yards not found');
  }

  // What does the UI ask now? try typing operator/value
  await page.keyboard.type('>= 300', { delay: 60 });
  await page.waitForTimeout(1200);
  console.log('after typing >=300:', JSON.stringify(await suggestions(page)));
  await page.screenshot({ path: 'shots/07-step6-operator.png' });

  console.log('CONSOLE:', JSON.stringify(consoleMsgs));
  await browser.close();
})();

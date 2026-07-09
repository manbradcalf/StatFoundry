const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const consoleMsgs = [];
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') consoleMsgs.push(`[${m.type()}] ${m.text().slice(0, 300)}`); });
  page.on('pageerror', e => consoleMsgs.push(`[pageerror] ${e.message.slice(0, 300)}`));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'shots/01-landing-viewport.png' });
  await page.screenshot({ path: 'shots/01-landing-full.png', fullPage: true });

  // Dump basic structure: nav links, buttons, inputs, headings
  const info = await page.evaluate(() => {
    const txt = el => (el.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 120);
    return {
      title: document.title,
      headings: [...document.querySelectorAll('h1,h2,h3')].map(h => `${h.tagName}: ${txt(h)}`),
      links: [...document.querySelectorAll('a')].map(a => `${txt(a)} -> ${a.getAttribute('href')}`),
      buttons: [...document.querySelectorAll('button')].map(b => txt(b) || b.getAttribute('aria-label') || '(no label)'),
      inputs: [...document.querySelectorAll('input,textarea')].map(i => `${i.tagName} type=${i.type} placeholder="${i.placeholder}"`),
      bodyTextStart: document.body.innerText.slice(0, 1500)
    };
  });
  console.log(JSON.stringify(info, null, 2));
  console.log('CONSOLE:', JSON.stringify(consoleMsgs, null, 2));
  await browser.close();
})();

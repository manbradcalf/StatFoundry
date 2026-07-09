const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.on('response', async r => {
    if (r.url().includes('8000')) {
      let body = '';
      try { body = (await r.text()).slice(0, 1500); } catch {}
      console.log('REQ:', r.request().method(), r.url());
      console.log('REQ BODY:', (r.request().postData() || '').slice(0, 800));
      console.log('RESP:', r.status(), body);
      console.log('---');
    }
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.click('text=Example Searches');
  await page.waitForTimeout(400);
  await page.click('button:has-text("Run Search")');
  await page.waitForTimeout(7000);
  await browser.close();
})();

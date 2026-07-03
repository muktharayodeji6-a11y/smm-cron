const { chromium } = require('playwright');

(async () => {
  const url = process.env.TARGET_URL;
  if (!url) {
    console.error('TARGET_URL secret not set');
    process.exit(1);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('Visiting target URL (key hidden)...');
  const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

  console.log('Status:', response.status());
  const text = await page.content();
  console.log('--- Response snippet ---');
  console.log(text.substring(0, 2000));

  await browser.close();
})();

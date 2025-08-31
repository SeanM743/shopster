const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.screenshot({ path: 'homepage-screenshot.png' });
  await browser.close();
  console.log('Screenshot saved to homepage-screenshot.png');
})();

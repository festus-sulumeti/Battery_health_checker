const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = `file://${path.resolve(__dirname, 'SpecRunner.html')}`;
  await page.goto(url);
  const result = await page.evaluate(() => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (window.jasmineDone) {
          clearInterval(interval);
          resolve(window.jasmineDone);
        }
      }, 100);
    });
  });
  console.log(result);
  await browser.close();
  process.exit(result.overallStatus === 'passed' ? 0 : 1);
})();

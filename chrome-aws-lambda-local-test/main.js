const fs = require("fs");
const path = require("path");
const chromium = require("chrome-aws-lambda");
// const puppeteer = require('puppeteer-core');

(async function () {
  let browser;

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
    });

    const page = await browser.newPage();
    const htmlFileURL = `file://${process.cwd()}/report.html`;

    await page.goto(htmlFileURL);
    // await page.goto("file:///tmp/report.html", { waitUntil: "networkidle0" });

    const generatedPDFFile = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    fs.writeFileSync(path.join(__dirname, "report.pdf"), generatedPDFFile);
  } catch (err) {
    console.log(err);
  } finally {
    if (!!browser) browser.close();
  }
})();

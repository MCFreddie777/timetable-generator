// require fs and puppeteer
const fs = require('fs');
const puppeteer = require('puppeteer');
const open = require('open');

async function captureScreenshot() {
    // if screenshots directory is not exist then create one
    if (!fs.existsSync('screenshots')) {
        fs.mkdirSync('screenshots');
    }

    let browser = null;
    let screenshotPath = 'screenshots/timetable.jpeg';

    try {
        // launch headless Chromium browser
        browser = await puppeteer.launch({ headless: true });

        // create new page object
        const page = await browser.newPage();

        // set viewport width and height
        await page.setViewport({ width: 1920, height: 600 });

        await page.goto('http://localhost:3000');

        // capture screenshot and store it into screenshots directory.
        await page.screenshot({ path: screenshotPath });
        console.log(`Image saved to ${screenshotPath}`);
        open(screenshotPath);
    } catch (err) {
        console.log(`❌ Error: ${err.message}`);
    } finally {
        await browser.close();
    }
}

captureScreenshot();

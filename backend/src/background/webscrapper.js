const puppeteer = require('puppeteer');

const fetchWebContent = async (url) => {

    const page = await browser.newPage();
    await page.goto(url);

    const content = await page.evaluate(() => {
        document.innerText.replace(/\s+/g, ' ')
            .trim()
            .slice(0, 12000)
    })
    await browser.close();
    return content;

}

module.exports = fetchWebContent;
const puppeteer = require('puppeteer');

const fetchWebContent = async (url) => {
    //launch browser
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.goto(url);

    //fetch content
    const content = await page.evaluate(() => {
        return document.body.innerText.replace(/\s+/g, ' ')
            .trim()
            .slice(0, 12000)
    });
    //close browser
    await browser.close();
    return content;

}

module.exports = fetchWebContent;
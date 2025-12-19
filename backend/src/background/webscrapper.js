const puppeteer = require('puppeteer');

const fetchWebContent = async (url) => {
    let browser = null;
    
    try {
        browser = await puppeteer.launch({
            headless: true,
            // Add these to  prevent crashes in docker environment
            args: ['--no-sandbox', '--disable-setuid-sandbox'] 
        });
        const page = await browser.newPage();

        //wait until dom content loaded
        await page.goto(url, { 
            waitUntil: 'domcontentloaded', 
            timeout: 10000 // 10 seconds max waiting
        });

        //Fetch content
        const content = await page.evaluate(() => {
            // Get text, remove massive whitespace, trim
            return document.body.innerText
                .replace(/\s+/g, ' ')
                .trim()
                .slice(0, 12000);
        });

        return content;

    } catch (error) {
        console.error(`Error in scraping:`, error.message);
        return null
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

module.exports = fetchWebContent;
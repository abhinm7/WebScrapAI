const puppeteer = require('puppeteer');

const fetchWebContent = async (url) => {
    let browser = null;

    try {

        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--single-process', '--no-zygote'],
        });

        console.log('Chrome path:', process.env.PUPPETEER_EXECUTABLE_PATH || puppeteer.executablePath());


        const page = await browser.newPage();

        //wait until dom content loaded
        await page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: 10000 // 10 seconds max waiting
        });
        //wait for client side hydration 
        await page.waitForFunction(
            () => document.body.innerText.length > 200,
            { timeout: 15000 }
        );
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
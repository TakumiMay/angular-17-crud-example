const { Builder, By } = require('selenium-webdriver');

(async () => {
    const driver = await new Builder().forBrowser('MicrosoftEdge').build();
    try {
        await driver.get('https://bing.com');

        const element = await driver.findElement(By.id('sb_form_q'));
        await element.sendKeys('WebDriver');
        await element.submit();

        await driver.sleep(5000);
    } finally {
        await driver.quit();
    }
})();
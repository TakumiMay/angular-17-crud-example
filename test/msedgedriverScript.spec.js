const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');

(async () => {
    const driver = await new Builder().forBrowser('MicrosoftEdge').build();
    try {
        await driver.get('https://bing.com');

        const element = await driver.findElement(By.id('sb_form_q'));
        await element.sendKeys('WebDriver');
        await element.submit();

        // Example assertion: Verify that the page title contains the search query
        const pageTitle = await driver.getTitle();
        assert(pageTitle.includes('WebDriver'), 'Page title does not contain search query');

        // Example assertion: Verify that search results are displayed
        const searchResults = await driver.findElements(By.className('b_algo'));
        assert(searchResults.length > 0, 'No search results found');
    } finally {
        await driver.quit();
    }
})();
const assert = require('assert');
const { Builder, By } = require('selenium-webdriver');
const { Options: EdgeOptions } = require('selenium-webdriver/edge');

describe('Selenium tests', function() {
  let driver;

  before(async function() {
    // Set up EdgeOptions
    const options = new EdgeOptions();
    options.excludeSwitches('enable-logging');

    // Set up Selenium WebDriver
    driver = await new Builder()
      .forBrowser('MicrosoftEdge')
      .setEdgeOptions(options)
      .build();
  });

  after(async function() {
    // Clean up Selenium WebDriver after all tests are done
    await driver.quit();
  });

  it('should perform a search', async function() {
    await driver.get('https://bing.com');

    const element = await driver.findElement(By.id('sb_form_q'));
    await element.sendKeys('WebDriver');
    await element.submit();

    // Verify that the page title contains the search query
    const pageTitle = await driver.getTitle();
    assert(pageTitle.includes('WebDriver'), 'Page title does not contain search query');

    // Verify that search results are displayed
    const searchResults = await driver.findElements(By.className('b_algo'));
    assert(searchResults.length > 0, 'No search results found');
  });
});

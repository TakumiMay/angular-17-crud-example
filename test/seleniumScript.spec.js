const { By, Builder } = require('selenium-webdriver');
const { Options: EdgeOptions } = require('selenium-webdriver/edge');
const assert = require('assert');

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
    try {
      await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

      // Verify that the page title is correct
      const title = await driver.getTitle();
      assert.equal(title, 'Web form', 'Page title is not "Web form"');

      // Set implicit wait
      await driver.manage().setTimeouts({ implicit: 500 });

      // Find the text box and submit button
      const textBox = await driver.findElement(By.name('my-text'));
      const submitButton = await driver.findElement(By.css('button'));

      // Enter text and click submit
      await textBox.sendKeys('Selenium');
      await submitButton.click();

      // Verify the received message
      const message = await driver.findElement(By.id('message'));
      const value = await message.getText();
      assert.equal(value, 'Received!', 'Received message is incorrect');
    } catch (error) {
      console.error('Error:', error);
    }
  });
});

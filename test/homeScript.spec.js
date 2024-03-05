const assert = require('assert');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { Options: EdgeOptions } = require('selenium-webdriver/edge');

describe('home page', function() {
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

  it('add a tutorial', async function() {
    try {
        await driver.get('http://localhost:8081/tutorials');

        const title = await driver.getTitle();
        assert.equal(title, 'Angular17Crud', 'Page title is not "Angular17Crud"');
        
        // Set implicit wait
        await driver.manage().setTimeouts({ implicit: 500 });

        await driver.findElement(By.css('.btn.btn-sm.btn-danger')).click();

        await driver.findElement(By.xpath("//a[contains(text(),'Add')]")).click();

        const currentUrl = await driver.getCurrentUrl();
        assert.equal(currentUrl, 'http://localhost:8081/add', 'Page url is not "localhost:8081/add"');
        
        const titleBox = await driver.findElement(By.name('title'));
        const descBox = await driver.findElement(By.name('description'));

        await titleBox.sendKeys('New tutorial title');
        await descBox.sendKeys('New tutorial description');

        await driver.findElement(By.css('button.btn.btn-success')).click();

        const successMessage = await driver.findElement(By.xpath("//h4[contains(text(),'Tutorial was submitted successfully!')]"));
        assert.ok(successMessage);
        
        await driver.findElement(By.xpath("//a[contains(text(),'Tutorials')]")).click();

        const searchInput = await driver.findElement(By.css('input[placeholder="Search by title"]'));
        await searchInput.clear();
        await searchInput.sendKeys('New tutorial title');

        await driver.findElement(By.css('.btn.btn-outline-secondary')).click();

        const tutorialsListTitle = await driver.findElement(By.xpath("//h4[contains(text(),'Tutorials List')]"));
        assert.ok(tutorialsListTitle);
    
        await driver.findElement(By.xpath("//li[contains(text(),'New tutorial title')]")).click();

        const descriptionElement = await driver.findElement(By.xpath("//div[contains(text(), 'New tutorial description')]"));

        const descriptionText = await descriptionElement.getText();
        assert.ok(descriptionText.trim().length > 0, 'Text content is empty');
        assert(descriptionText.includes('New tutorial description'), `Description does not contain expected text: ${'New tutorial description'}`);

    } catch (error) {
        console.error('Error:', error);
    }
  });
});

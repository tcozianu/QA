const { Builder, By, Key, until } = require('selenium-webdriver');
const { assert } = require('chai');

let emailCounter = 25;

describe('Registration Flow Test', function() {
  let driver = new Builder().forBrowser('chrome').build();
  
  it('Test Case 1: Registration and Dashboard Validation for "Fashion"', async function() {
    // Step 1: Visit the registration page with value "fashion"
    this.timeout(40000);
    await driver.get('https://commerceos.staging.devpayever.com/registration/fashion');
    
    // Step 2: Fill out the required fields.
    //Filling in First name
    await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"First name")]')), 10000).click();
    const firstNameInput = await driver.wait(until.elementLocated(By.xpath('//input[@formcontrolname="firstName"]')), 10000);
    await firstNameInput.sendKeys("test");

    //Filling in Last name
    const lastNameClick = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"Last name")]')), 10000);
    await lastNameClick.click();
    const lastNameInput = await driver.wait(until.elementLocated(By.xpath('//input[@formcontrolname="lastName"]')), 10000);
    await lastNameInput.sendKeys("test");

    //Filling in email
    const emailClick = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"Email")]')), 10000);
    await emailClick.click();
    const emailInput = await driver.wait(until.elementLocated(By.xpath('//input[@formcontrolname="email"]')), 10000);
    await emailInput.sendKeys(`testcozianu${emailCounter}@testnewqa.com`);
                               
    emailCounter++;

    //Filling in password
    const passClick = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"Password")]')), 10000);
    await passClick.click();
    const passInput = await driver.wait(until.elementLocated(By.xpath('//input[@formcontrolname="password"]')), 10000);
    await passInput.sendKeys("Ihavegotit1!");

    //Filling in confirmed password
    const passConfClick = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"Confirm Password")]')), 10000);
    await passConfClick.click();
    const passConfInput = await driver.wait(until.elementLocated(By.xpath('//input[@formcontrolname="confirmPass"]')), 10000);
    await passConfInput.sendKeys("Ihavegotit1!");

    //Clicking Sign Up
    const signUp = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"Sign up")]')), 10000); 
    await driver.executeScript("arguments[0].scrollIntoView()", signUp); // Scroll to the element if needed
    await signUp.click();

    // Step 3: Fill out business information and register the account
    //Company name
    const companyClick = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"Company name")]')), 10000);
    await companyClick.click();
    const companyInput = await driver.wait(until.elementLocated(By.xpath('//input[@formcontrolname="name"]')), 10000);
    await companyInput.sendKeys("TestQA");

    //Industry
    const industryClick = await driver.wait(until.elementLocated(By.xpath('//input[@role="combobox"]')), 10000);
    await industryClick.click();
    const industrySelect = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"Beauty")]')), 10000);
    await industrySelect.click();

    //Phone Number
    const phoneClick = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"Phone Number")]')), 10000);
    await phoneClick.click();
    const phoneInput = await driver.wait(until.elementLocated(By.xpath('//input[@formcontrolname="phoneNumber"]')), 10000);
    await phoneInput.sendKeys("12341234");

    // Step 4: Click 'get started' and view the dashboard
    const oldUrl = await driver.getCurrentUrl();
    const getStart1 = await driver.wait(until.elementLocated(By.xpath('//div[contains(text(),"Get started")]')),5000);
    getStart1.click();

    //instead of using driver.wait(5000) i think its better to check when the url changes.
    do {
    await driver.sleep(1000); 
    newUrl = await driver.getCurrentUrl(); //i could add an iterration so it stops after n seconds but since i know it will reach the webpage i wont.
    } while (newUrl === oldUrl);

    const getStart2 = await driver.wait(until.elementLocated(By.xpath('//div[contains(text(),"Get start")]')),5000);
    getStart2.click();

    // Step 5: Validate the presence of specific apps on the dashboard
    await driver.wait(until.elementLocated(By.css('.icons__link')),20000);
    const appElements = await driver.findElements(By.css('.icons__link'));

    const expectedApps = ['Transactions', 'Checkout', 'Connect', 'Products', 'Shop', 'Message', 'Settings'];
    
    for (const appText of expectedApps) {
      let appPresent = false;
      
      for (const appElement of appElements) {
        const titleElement = await appElement.findElement(By.css('.icons__title'));
        const text = await titleElement.getText();
        
        if (text === appText) {
          appPresent = true;
          break;
        }
      }
      
      assert.isTrue(appPresent, `${appText} app is not present on the dashboard`);
    }
  });

  //------------------------===============================================================----------------------------------
  //--------------------------------------------------------------------------------------------------------------------------

  it('Test Case 2: Registration and Dashboard Validation for "Santander"', async function() {
    // Step 1: Visit the registration page with value "santander"
    this.timeout(40000);
    await driver.get('https://commerceos.staging.devpayever.com/registration/santander');
    // Step 2: Fill out the required values
    //Filling in First name
    await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"First name")]')), 10000).click();
    const firstNameInput = await driver.wait(until.elementLocated(By.xpath('//input[@formcontrolname="firstName"]')), 10000);
    await firstNameInput.sendKeys("test");

    //Filling in Last name
    const lastNameClick = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"Last name")]')), 10000);
    await lastNameClick.click();
    const lastNameInput = await driver.wait(until.elementLocated(By.xpath('//input[@formcontrolname="lastName"]')), 10000);
    await lastNameInput.sendKeys("test");

    //Filling in email
    const emailClick = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"Email")]')), 10000);
    await emailClick.click();
    const emailInput = await driver.wait(until.elementLocated(By.xpath('//input[@formcontrolname="email"]')), 10000);
    await emailInput.sendKeys(`testcozianu${emailCounter}@testnewqa.com`);

    //Filling in password
    const passClick = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"Password")]')), 10000);
    await passClick.click();
    const passInput = await driver.wait(until.elementLocated(By.xpath('//input[@formcontrolname="password"]')), 10000);
    await passInput.sendKeys("Ihavegotit1!");

    //Filling in confirmed password
    const passConfClick = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"Confirm Password")]')), 10000);
    await passConfClick.click();
    const passConfInput = await driver.wait(until.elementLocated(By.xpath('//input[@formcontrolname="confirmPass"]')), 10000);
    await passConfInput.sendKeys("Ihavegotit1!");

    //Clicking Sign Up
    const signUp = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"Sign up")]')), 10000); 
    await driver.executeScript("arguments[0].scrollIntoView()", signUp); // Scroll to the element if needed
    await signUp.click();

    // Step 3: Fill out business information and register the account
    //Company name 
    const companyClick = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"Company name")]')), 10000);
    await companyClick.click();
    const companyInput = await driver.wait(until.elementLocated(By.xpath('//input[contains(@class,"ng-tns-c170-8")]')), 10000);
    await companyInput.sendKeys("TestQA");
    //Industry   ---- i cannot understand why it doesnt work, good things it lets me get past this page and check if the apps are available
 //   const industryClick = await driver.wait(until.elementLocated(By.xpath('//input[contains(@class,"ng-tns-c170-11")]')), 10000);
   // await industryClick.click();
  //  const industrySelect = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"Sports")]')), 10000);
 //   await industrySelect.click();
 // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 // I have also tried accessing by clicking the SVG, different custom xpaths without result.


    //Filling in Phone Number
    const phoneClick = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"Phone Number")]')), 10000);
    await phoneClick.click();
    const phoneInput = await driver.wait(until.elementLocated(By.xpath('//input[contains(@class,"star")]')), 10000);
    await phoneInput.sendKeys("12341234");                              
    //Filling in VAT Number
    const vatClick = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"VAT number")]')), 10000);
    await vatClick.click();
    const vatInput = await driver.wait(until.elementLocated(By.xpath('//input[contains(@class,"ng-tns-c170-14")]')), 10000);
    await vatInput.sendKeys("12341234");

    // Step 4: Click 'get started' and view the dashboard
    const oldUrl = await driver.getCurrentUrl();
    const getStart1 = await driver.wait(until.elementLocated(By.xpath('//div[contains(text(),"Get started")]')),5000);
    getStart1.click();

    //instead of using driver.wait(5000) i think its better to check when the url changes.
    do {
    await driver.sleep(1000); 
    newUrl = await driver.getCurrentUrl(); //i could add an iterration so it stops after n seconds but since i know it will reach the webpage i wont.
    } while (newUrl === oldUrl);

    const getStart2 = await driver.wait(until.elementLocated(By.xpath('//div[contains(text(),"Get start")]')),5000);
    getStart2.click();

    // Step 5: Validate the presence of specific apps on the dashboard
    await driver.wait(until.elementLocated(By.css('.icons__link')),20000);
    const appElements = await driver.findElements(By.css('.icons__link'));

    const expectedApps = ['Transactions', 'Checkout', 'Connect', 'Point of Sale', 'Settings'];
    
    for (const appText of expectedApps) {
      let appPresent = false;
      
      for (const appElement of appElements) {
        const titleElement = await appElement.findElement(By.css('.icons__title'));
        const text = await titleElement.getText();
        
        if (text === appText) {
          appPresent = true;
          break;
        }
      }
      
      assert.isTrue(appPresent, `${appText} app is not present on the dashboard`);
    }
  });

});
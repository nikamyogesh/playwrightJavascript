const { test, expect } = require('@playwright/test');
const { createUser } = require('../../helpers/createUser');
const LoginPage = require('../../pages/loginpage');
const ProductsPage = require('../../pages/productspage');
const CheckoutPage = require('../../pages/checkoutpage');

test.describe('OWASP Juice Shop Login Flow', () => {

  let testUser;

  // Run to create test user
  test.beforeAll(async ({ request }) => {
    testUser = await createUser(request);
    console.log('User created for tests:', testUser.email);

  });

  // Navigate to login page and dismiss welcome banner if displayed
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/login');

    const dismissButton = page.locator('button.close-dialog');
    try {
      // Wait up to 2 seconds for the button to become visible
      await dismissButton.waitFor({ state: 'visible', timeout: 2000 });
      await dismissButton.click();
    } catch {
      // Ignore if the dismiss button never appears
      console.log('No dismiss banner found.');
    }
  });


  // Test: login with valid credentials
  test('Login with valid credentials user', async ({ page }) => {

    // Create a new instance of LoginPage object
    const loginPage = new LoginPage(page);

    // Fill in valid credentials
    await loginPage.login(testUser.email, 'Test@2025');

    // Create a new instance of ProductsPage object
    const productsPage = new ProductsPage(page);

    // verify products page is loaded
    await productsPage.verifyProductsPageLoaded();

  });


  // Test: login with invalid credentials
  test('Login with invalid credentials user', async ({ page }) => {

    // Create a new instance of LoginPage object
    const loginPage = new LoginPage(page);

    // Login with invalid credentials
    await loginPage.login('wrong@example.com', 'WrongPass123');

    // verify error message displayed for invalid login
    await expect(loginPage.errorMessage).toHaveText('Invalid email or password.');

  });

  // Test: Browse the products
  test('Browse the product on the page', async ({ page }) => {

    // Create a new instance of the LoginPage object
    const loginPage = new LoginPage(page);

    // Login with valid credentials
    await loginPage.login(testUser.email, 'Test@2025');

    // Create a new instance of the ProductsPage object
    const productsPage = new ProductsPage(page);

    // View the details of the product
    await productsPage.viewProductDetails();

    // Verify that the product details popup/dialog is displayed
    await productsPage.verifyProductDetailsPopup();

    // Close the product details popup/dialog
    await productsPage.closeProductDetailsPopup();

    // Assert that the product details popup/dialog has been closed
    await productsPage.verifyPopupClosed();

  });


  test('Add product to the basket', async ({ page }) => {

    // Create a new instance of LoginPage object
    const loginPage = new LoginPage(page);

    // Login using valid credentials
    await loginPage.login(testUser.email, 'Test@2025');

    // Create a new instance of ProductsPage object
    const productsPage = new ProductsPage(page);

    //get product name to verify it in view basket
    const productName = await productsPage.getProductName();
    console.log(productName);

    // Add the first available product to the basket
    await productsPage.addProductToBasket();

    //  View the basket
    await productsPage.viewBasket();

    // Create a new instance of checkOutPage object
    const checkoutPage = new CheckoutPage(page);

    // verify basket and checkout button are visible
    await checkoutPage.assertBasketAndCheckoutAvailable();

    // verify the selected product name shown correctly in basket
    await checkoutPage.assertProductInBasket(productName);

  });


  test('Verify checkout', async ({ page }) => {

    // Create a new instance of LoginPage object
    const loginPage = new LoginPage(page);

    // Login with valid credentials
    await loginPage.login(testUser.email, 'Test@2025');

    // Create a new instance of ProductsPage object
    const productsPage = new ProductsPage(page);

    // Add the first available product to the basket
    await productsPage.addProductToBasket();

    // View the basket
    await productsPage.viewBasket();

    // Create a new instance of checkOutPage object
    const checkoutPage = new CheckoutPage(page);

    // verify basket and checkout button are visible
    await checkoutPage.assertBasketAndCheckoutAvailable();

    //click checkout button
    await checkoutPage.proceedToCheckout();

    //verify "Add New Address" section is visible
    await checkoutPage.assertAddNewAddressVisible();

    //Enter Address details
    await checkoutPage.enterAddress();

    // Submit address form
    await checkoutPage.submitAddress();

    //select delivery address and click continue
    await checkoutPage.selectDeliveryAddressAndContinue();

    //Choose a delivery speed and continue
    await checkoutPage.chooseDeliverySpeedAndContinue();

    //Payment Options displayed and continue button disabled
    await checkoutPage.assertAtPaymentOptions();

  });


});

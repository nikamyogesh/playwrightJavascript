//import { test, expect } from '@playwright/test';
import { test, expect } from '../../pages/base.js';
import { createUser } from '../../helpers/createUser.js';
//import { LoginPage, ProductsPage, CheckoutPage } from '../../pages/index.js';


test.describe('OWASP Juice Shop Login Flow', () => {

  let testUser;

  // Run to create test user
  test.beforeAll(async ({ request }) => {
    testUser = await createUser(request);
    console.log('User created for tests:', testUser.email);

  });


  // Test: login with valid credentials
  test('Login with valid credentials user', async ({
    loginPage,
    productsPage
  }) => {

    // Fill in valid credentials
    await loginPage.login(testUser.email, 'Test@2025');

    // verify products page is loaded
    await productsPage.verifyProductsPageLoaded();

  });


  // Test: login with invalid credentials
  test('Login with invalid credentials user', async ({
    loginPage
  }) => {

    // Login with invalid credentials
    await loginPage.login('wrong@example.com', 'WrongPass123');

    // verify error message displayed for invalid login
    await expect(loginPage.errorMessage).toHaveText('Invalid email or password.');

  });

  // Test: Browse the products
  test('Browse the product on the page', async ({
    loginPage,
    productsPage
  }) => {

    // Login with valid credentials
    await loginPage.login(testUser.email, 'Test@2025');

    // View the details of the product
    await productsPage.viewProductDetails();

    // Verify that the product details popup/dialog is displayed
    await productsPage.verifyProductDetailsPopup();

    // Close the product details popup/dialog
    await productsPage.closeProductDetailsPopup();

    // Assert that the product details popup/dialog has been closed
    await productsPage.verifyPopupClosed();

  });


  test('Add product to the basket', async ({
    loginPage,
    productsPage,
    checkoutPage
  }) => {

    // Login using valid credentials
    await loginPage.login(testUser.email, 'Test@2025');

    //get product name to verify it in view basket
    const productName = await productsPage.getProductName();
    console.log(productName);

    // Add the first available product to the basket
    await productsPage.addProductToBasket();

    //  View the basket
    await productsPage.viewBasket();

    // verify basket and checkout button are visible
    await checkoutPage.assertBasketAndCheckoutAvailable();

    // verify the selected product name shown correctly in basket
    await checkoutPage.assertProductInBasket(productName);

  });


  test('Verify checkout', async ({
    loginPage,
    productsPage,
    checkoutPage
  }) => {


    // Login with valid credentials
    await loginPage.login(testUser.email, 'Test@2025');

    // Add the first available product to the basket
    await productsPage.addProductToBasket();

    // View the basket
    await productsPage.viewBasket();

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

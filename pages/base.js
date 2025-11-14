import { test as base } from '@playwright/test';
import { LoginPage, ProductsPage, CheckoutPage } from '../pages/index.js';


export const test = base.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
});

test.beforeEach(async ({ page }) => {
  // Set cookies to dismiss banners and set language before page actions
  await page.context().addCookies([
    {
      name: 'cookieconsent_status',
      value: 'dismiss',
      domain: 'localhost', // Change if testing another domain
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: 'Lax'
    },
    {
      name: 'welcomebanner_status',
      value: 'dismiss',
      domain: 'localhost', // Change if testing another domain
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: 'Lax'
    },
    {
      name: 'language',
      value: 'en',
      domain: 'localhost', // Change if testing another domain
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: 'Lax'
    }
  ]);

  // Now navigate to login page (app will read cookies above)
  await page.goto('/#/login');

  // Dismiss welcome banner if displayed
  const dismissButton = page.locator('button.close-dialog');
  if (await dismissButton.isVisible({ timeout: 2000 })) {
    await dismissButton.click();
  }
});



export { expect } from '@playwright/test';

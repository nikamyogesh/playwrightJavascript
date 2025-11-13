const { expect } = require('@playwright/test');

// checkoutpage.js

class CheckoutPage {
    constructor(page) {
        this.page = page;
        // Basket and Checkout locators
        this.basketSection = this.page.locator('app-purchase-basket');
        this.basketProductName = this.page.locator("mat-cell[class='mat-mdc-cell mdc-data-table__cell cdk-cell cdk-column-product mat-column-product ng-star-inserted']");
        this.checkoutButton = this.page.getByText('Checkout');
        // Address form
        this.addNewAddressHeader = this.page.locator("//span[contains(text(),'Add New Address')]");
        this.addNewAddressBtn = this.page.getByRole('button', { name: 'Add a new address' });
        this.countryField = this.page.getByRole('textbox', { name: 'Country' });
        this.nameField = this.page.getByRole('textbox', { name: 'Name' });
        this.mobileField = this.page.getByRole('spinbutton', { name: 'Mobile Number' });
        this.zipField = this.page.getByRole('textbox', { name: 'ZIP Code' });
        this.addressField = this.page.getByRole('textbox', { name: 'Address' });
        this.cityField = this.page.getByRole('textbox', { name: 'City' });
        this.stateField = this.page.getByRole('textbox', { name: 'State' });
        this.submitAddressBtn = page.getByRole('button', { name: 'Submit' });
        // Delivery and consent section
        this.addressRadioBtn = this.page.getByRole('radio').first();
        this.cookieDismissBtn = this.page.getByRole('button', { name: 'dismiss cookie message' });
        this.continueBtnByText = this.page.getByText('Continue');
        // Delivery speed
        this.deliverySpeedRadioBtn = this.page.getByRole('radio').first();
        // Payment verification
        this.paymentOptionsText = this.page.getByText('My Payment Options');
    }



    // verify basket and checkout button are visible
    async assertBasketAndCheckoutAvailable() {
        await expect(this.basketSection).toBeVisible();
        await expect(this.checkoutButton).toBeVisible();
    }

    //verify to check the selected product name shown correctly in basket
    async assertProductInBasket(expectedProductName) {
        await expect(this.basketProductName.first()).toBeVisible({ timeout: 2000 });
        await expect(this.basketProductName.first()).toHaveText(expectedProductName, { timeout: 2000 });
    }

    // Click checkout button to proceed
    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    // verify "Add New Address" section is visible
    async assertAddNewAddressVisible() {
        await expect(this.addNewAddressHeader).toBeVisible();
    }

    // Fill new address form with provided details
    async enterAddress() {
        await this.addNewAddressBtn.click();
        await this.countryField.fill('UK');
        await this.nameField.fill('Test');
        await this.mobileField.fill('8223456');
        await this.zipField.fill('12345');
        await this.addressField.fill('Boston street');
        await this.cityField.fill('London');
        await this.stateField.fill('Surrey');
    }

    // Submit address form
    async submitAddress() {
        await this.submitAddressBtn.click();
    }

    // Select delivery address, handle cookie consent, and click continue
    async selectDeliveryAddressAndContinue() {
        await this.addressRadioBtn.check();
        if (await this.cookieDismissBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
            await this.cookieDismissBtn.click();
            console.log('Cookie consent dismissed');
        }
        await this.continueBtnByText.click();
    }

    // Choose delivery speed and click continue
    async chooseDeliverySpeedAndContinue() {
        await this.deliverySpeedRadioBtn.check();
        await this.continueBtnByText.click();
    }

    // Assert payment options is loaded and continue button is disabled
    async assertAtPaymentOptions() {
        await expect(this.paymentOptionsText).toBeVisible();
        await expect(this.continueBtnByText).toBeDisabled();
    }
}

module.exports = CheckoutPage;

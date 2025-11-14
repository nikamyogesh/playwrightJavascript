import { expect } from '@playwright/test';

// productspage.js

export class ProductsPage {
    constructor(page) {
        this.page = page;
        this.pageHeader = this.page.locator("//span[@class='hide-lt-sm']");//
        this.productsGridFirstCard = this.page.locator('mat-grid-tile .mat-grid-tile-content .mat-mdc-card').first();
        this.productItem = this.productsGridFirstCard.locator('.product');
        this.productDialog = this.page.locator('mat-dialog-content');//
        this.productName = this.productDialog.locator('h1');
        this.closeDialogButton = this.productDialog.locator('button.close-dialog');
        this.addProdcutName = this.productsGridFirstCard.locator('div.item-name');
        this.addToBasketButton = this.productsGridFirstCard.locator('button:has-text("Add to Basket")');
        this.basketButton = this.page.locator("//span[normalize-space()='Your Basket']");//
    }

    // verify products loaded
    async verifyProductsPageLoaded() {
        await expect(this.pageHeader).toBeVisible();
        await expect(this.pageHeader).toHaveText('OWASP Juice Shop');
    }

    // View product details 
    async viewProductDetails() {
        await expect(this.productsGridFirstCard).toBeVisible({ timeout: 3000 });
        await expect(this.productItem).toBeVisible();
        await this.productItem.click();
    }

    // product details displayded
    async verifyProductDetailsPopup() {
        await expect(this.productDialog).toBeVisible();
        await expect(this.productName).toHaveText(/.+/); // at least one character
    }

    // Close product details 
    async closeProductDetailsPopup() {
        await expect(this.closeDialogButton).toBeVisible();
        await this.closeDialogButton.click();
    }

    // verify product details popup is closed
    async verifyPopupClosed() {
        await expect(this.productDialog).toHaveCount(0);
    }

    // Get product name
    async getProductName() {
       // await expect(this.addProdcutName).toBeVisible();
        const text = await this.addProdcutName.textContent();
        return text.trim();
    }

    // Add product to basket and open basket
    async addProductToBasket() {
        await expect(this.productsGridFirstCard).toBeVisible({ timeout: 3000 });
        await expect(this.addToBasketButton).toBeVisible();
        await this.addToBasketButton.click();

    }

    // open basket
    async viewBasket() {
        await expect(this.basketButton).toBeVisible();
        await this.basketButton.click();
    }

}

//module.exports = ProductsPage;

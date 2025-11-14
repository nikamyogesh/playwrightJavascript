import { expect } from '@playwright/test';


// loginpage.js

export class LoginPage {

    constructor(page) {
        this.page = page;
        this.emailField = page.locator('#email');
        this.passwordField = page.locator('#password');
        this.loginButton = page.locator('#loginButton > span.mat-mdc-button-touch-target');
        this.errorMessage = page.locator('div.error:has-text("Invalid email or password.")');
    }

    //login method
    async login(username, password) {
        await this.emailField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    //invalid login error message assertion
    async assertLoginFailure(expectedMessage) {
        await expect(this.errorMessage).toHaveText(expectedMessage);
    }

}

//module.exports = LoginPage;
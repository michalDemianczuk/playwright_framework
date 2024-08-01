import { BasePage } from './base.page';
import { Page } from 'playwright';

export class RegisterPage extends BasePage {
    url = '/register.html';
    nameInput = this.page.getByTestId('firstname-input');
    lastNameInput = this.page.getByTestId('lastname-input');
    emailInput = this.page.getByTestId('email-input');
    passwordInput = this.page.getByTestId('password-input');
    registerButton = this.page.getByTestId('register-button');
    registerPopup = this.page.getByTestId('alert-popup');
    constructor(page: Page) {
        super(page);
    }

    async register(
        name: string,
        lastName: string,
        email: string,
        password: string,
    ): Promise<void> {
        await this.nameInput.fill(name);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.registerButton.click();
    }
}

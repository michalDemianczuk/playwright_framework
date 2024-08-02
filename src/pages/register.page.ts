import { RegisterUser } from '../models/user.model';
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
    emailErrorText = this.page.locator('#octavalidate_email')
    constructor(page: Page) {
        super(page);
    }

    async register(userData: RegisterUser): Promise<void> {
        await this.nameInput.fill(userData.userFirstName);
        await this.lastNameInput.fill(userData.userLastName);
        await this.emailInput.fill(userData.userEmail);
        await this.passwordInput.fill(userData.userPassword);
        await this.registerButton.click();
    }
}

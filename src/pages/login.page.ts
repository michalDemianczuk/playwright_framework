import { LoginData } from '../models/login.model';
import { BasePage } from './base.page';
import { Page } from 'playwright';

export class LoginPage extends BasePage {
    url = '/login/';
    loginError = this.page.getByTestId('login-error');
    userEmailInput = this.page.getByPlaceholder('Enter User Email');
    userPasswordInput = this.page.getByPlaceholder('Enter Password');
    loginButton = this.page.getByRole('button', { name: 'LogIn' });

    constructor(page: Page) {
        super(page);
    }

    async login(loginData: LoginData): Promise<void> {
        await this.userEmailInput.fill(loginData.userEmail);
        await this.userPasswordInput.fill(loginData.userPassword);
        await this.loginButton.click();
    }
}

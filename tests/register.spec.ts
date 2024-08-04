import { randomUser } from '../src/factories/user.factory';
import { RegisterUser } from '../src/models/user.model';
import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { expect, test } from 'playwright/test';

test.describe('Verify register', () => {
    let registerPage: RegisterPage;
    let loginPage: LoginPage;
    let welcomePage: WelcomePage;
    let registerUser: RegisterUser;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        loginPage = new LoginPage(page);
        welcomePage = new WelcomePage(page);
        registerUser = randomUser();
    });

    test('Register with correct data and login @GAD_R03_01', async () => {
        await registerPage.goto();
        await registerPage.register(registerUser);
        await expect(registerPage.registerPopup).toBeVisible();
        await expect(registerPage.registerPopup).toHaveText('User created');

        await loginPage.waitForPageToLoadUrl();
        const titleLoginPage = await loginPage.title();
        expect.soft(titleLoginPage).toContain('Login');

        await loginPage.login({
            userEmail: registerUser.userEmail,
            userPassword: registerUser.userPassword,
        });
        const titleWelcomePage = await welcomePage.title();
        expect(titleWelcomePage).toContain('Welcome');
    });

    test('Not register with incorrect data - non valid email @GAD_R03_04', async () => {
        registerUser.userEmail = 'sdjhfg!@^%$';

        await registerPage.goto();
        await registerPage.register(registerUser);

        const expectedErrorMessage = 'Please provide a valid email address';
        await expect(registerPage.emailErrorText).toHaveText(
            expectedErrorMessage,
        );
    });
});

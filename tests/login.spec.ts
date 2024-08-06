import { LoginDataModel } from '../src/models/login.model';
import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { testUser1 } from '../src/test-data/user.data';
import { expect, test } from 'playwright/test';

test.describe('Verify login', () => {
    test('Login with correct credentials @GAD_R02_01', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const welcomePage = new WelcomePage(page);
        await loginPage.goto();
        await loginPage.login(testUser1);
        const title = await welcomePage.getTitle();
        expect(title).toContain('Welcome');
    });

    test('Reject login with incorrect password @GAD_R02_01', async ({
        page,
    }) => {
        const loginPage = new LoginPage(page);
        const loginData: LoginDataModel = {
            userEmail: testUser1.userEmail,
            userPassword: 'incorrectPassword',
        };
        await loginPage.goto();
        await loginPage.login(loginData);
        await expect
            .soft(loginPage.loginError)
            .toHaveText('Invalid username or password');
        const title = await loginPage.getTitle();
        expect.soft(title).toContain('Login');
    });
});

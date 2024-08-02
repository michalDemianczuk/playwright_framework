import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { testUser1 } from '../src/test-data/user.data';
import { expect, test } from 'playwright/test';

test.describe('Verify login', () => {
    test('Login with correct credentials @GAD_R02_01', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const welcomePage = new WelcomePage(page);
        const email = testUser1.userEmail;
        const password = testUser1.userPassword;
        await loginPage.goto();
        await loginPage.login(email, password);
        const title = await welcomePage.title();
        expect(title).toContain('Welcome');
    });

    test('Reject login with incorrect password @GAD_R02_01', async ({
        page,
    }) => {
        const loginPage = new LoginPage(page);
        const email = testUser1.userEmail;
        const password = 'incorrectPassword';
        await loginPage.goto();
        await loginPage.login(email, password);
        await expect
            .soft(loginPage.loginError)
            .toHaveText('Invalid username or password');
        const title = await loginPage.title();
        expect.soft(title).toContain('Login');
    });
});

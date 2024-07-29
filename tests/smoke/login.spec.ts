import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { expect, test } from 'playwright/test';

test.describe('Verify login', () => {
    test('Login with correct credentials @GAD_R02_01', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const welcomePage = new WelcomePage(page);
        await loginPage.goto();
        await loginPage.login('wilma.langworth@test.test.dev', '4dzFC');
        const title = await welcomePage.title();
        expect(title).toContain('Welcome');
    });
});

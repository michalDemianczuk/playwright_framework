import { STORAGE_STATE } from '../../playwright.config';
import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { testUser1 } from '../../src/test-data/user.data';
import { expect, test as setup } from 'playwright/test';

setup('Login with correct credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);
    await loginPage.goto();
    await loginPage.login(testUser1);
    const title = await welcomePage.getTitle();
    expect(title).toContain('Welcome');
    await page.context().storageState({ path: STORAGE_STATE });
});

import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { faker } from '@faker-js/faker';
import { expect, test } from 'playwright/test';

test.describe('Verify register', () => {
    test('Register with correct data and login @GAD_R03_01', async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page);
        const loginPage = new LoginPage(page);
        const welcomePage = new WelcomePage(page);

        const name = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email({
            firstName: name,
            lastName: lastName,
        });
        const password = faker.internet.password();

        await registerPage.goto();
        await registerPage.register(name, lastName, email, password);
        await expect(registerPage.registerPopup).toBeVisible();
        await expect(registerPage.registerPopup).toHaveText('User created');

        await loginPage.waitForPageToLoadUrl();
        const titleLoginPage = await loginPage.title();
        expect.soft(titleLoginPage).toContain('Login');

        await loginPage.login(email, password);
        const titleWelcomePage = await welcomePage.title();
        expect(titleWelcomePage).toContain('Welcome');
    });
});

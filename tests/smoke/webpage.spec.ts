import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentsPage } from '../../src/pages/comments.page';
import { HomePage } from '../../src/pages/home.page';
import { expect, test } from 'playwright/test';

test.describe('Verify service main page', () => {
    test('Home page title @GAD-R01-01', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        const title = await homePage.title();
        expect(title).toContain('GAD');
    });

    test('Articles page title @GAD-R01-02', async ({ page }) => {
        const articlesPage = new ArticlesPage(page);
        await articlesPage.goto();
        const title = await articlesPage.title();
        expect(title).toContain('Articles');
    });

    test('Comments page title @GAD-R01-02', async ({ page }) => {
        const commentsPage = new CommentsPage(page);
        await commentsPage.goto();
        const title = await commentsPage.title();
        expect(title).toContain('Comments');
    });
});

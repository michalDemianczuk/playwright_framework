import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentsPage } from '../../src/pages/comments.page';
import { HomePage } from '../../src/pages/home.page';
import { expect, test } from 'playwright/test';

test.describe('Verify menu main buttons', () => {
    test('Comments button navigates to comments page @GAD-R01-03', async ({
        page,
    }) => {
        const articlesPage = new ArticlesPage(page);
        const commentsPage = new CommentsPage(page);

        await articlesPage.goto();
        await articlesPage.mainMenu.commentsButton.click();
        const title = await commentsPage.title();
        expect(title).toContain('Comments');
    });

    test('Articles button navigates to comments page @GAD-R01-03', async ({
        page,
    }) => {
        const articlesPage = new ArticlesPage(page);
        const commentsPage = new CommentsPage(page);

        await commentsPage.goto();
        await commentsPage.mainMenu.articlesButton.click();
        const title = await articlesPage.title();
        expect(title).toContain('Articles');
    });

    test('Home page button navigates to main page @GAD-R01-03', async ({
        page,
    }) => {
        const articlesPage = new ArticlesPage(page);
        const homePage = new HomePage(page);

        await articlesPage.goto();
        await articlesPage.mainMenu.homePage.click();
        const title = await homePage.title();
        expect(title).toContain('GAD');
    });
});

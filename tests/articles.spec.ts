import { randomArticle } from '../src/factories/article.factory';
import { ArticlePage } from '../src/pages/article.page';
import { ArticlesPage } from '../src/pages/articles.page';
import { LoginPage } from '../src/pages/login.page';
import { testUser1 } from '../src/test-data/user.data';
import { AddArticleView } from '../src/views/add-article.view';
import { expect, test } from 'playwright/test';

test.describe('Verify login', () => {
    test('Create new article @GAD_R04_01', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(testUser1);
        const articlesPage = new ArticlesPage(page);
        await articlesPage.goto();
        await articlesPage.addNewArticleButton.click();

        const addArticleView = new AddArticleView(page);
        await expect.soft(addArticleView.header).toBeVisible();

        const articleData = randomArticle();

        await addArticleView.createNewArticle(articleData);

        const articlePage = new ArticlePage(page);
        await expect(articlePage.articleTitle).toHaveText(
            articleData.articleTitle,
        );
        await expect(articlePage.articleBody).toHaveText(
            articleData.articleBody,
        );
    });

    test('Verify error if title was not provided @GAD_R04_01', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(testUser1);
        const articlesPage = new ArticlesPage(page);
        await articlesPage.goto();
        await articlesPage.addNewArticleButton.click();

        const addArticleView = new AddArticleView(page);
        await expect.soft(addArticleView.header).toBeVisible();

        const articleData = randomArticle();
        articleData.articleTitle = '';

        await addArticleView.createNewArticle(articleData);
        await expect(addArticleView.alert).toHaveText('Article was not created')

    });

    test('Verify error if body was not provided @GAD_R04_01', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(testUser1);
        const articlesPage = new ArticlesPage(page);
        await articlesPage.goto();
        await articlesPage.addNewArticleButton.click();

        const addArticleView = new AddArticleView(page);
        await expect.soft(addArticleView.header).toBeVisible();

        const articleData = randomArticle();
        articleData.articleBody = '';

        await addArticleView.createNewArticle(articleData);
        await expect(addArticleView.alert).toHaveText('Article was not created')

    });
});

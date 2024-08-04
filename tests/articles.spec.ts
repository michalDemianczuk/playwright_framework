import { randomArticle } from '../src/factories/article.factory';
import { ArticleData } from '../src/models/article.model';
import { ArticlePage } from '../src/pages/article.page';
import { ArticlesPage } from '../src/pages/articles.page';
import { LoginPage } from '../src/pages/login.page';
import { testUser1 } from '../src/test-data/user.data';
import { AddArticleView } from '../src/views/add-article.view';
import { expect, test } from 'playwright/test';

test.describe('Verify login', () => {
    let loginPage: LoginPage;
    let articlesPage: ArticlesPage;
    let addArticleView: AddArticleView;
    let articlePage: ArticlePage;

    let articleData: ArticleData;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        articlesPage = new ArticlesPage(page);
        addArticleView = new AddArticleView(page);
        articlePage = new ArticlePage(page);

        articleData = randomArticle();

        await loginPage.goto();
        await loginPage.login(testUser1);
        await articlesPage.goto();
        await articlesPage.addNewArticleButton.click();
        await expect.soft(addArticleView.header).toBeVisible();
    });

    test('Create new article @GAD_R04_01', async () => {
        await addArticleView.createNewArticle(articleData);

        await expect(articlePage.articleTitle).toHaveText(
            articleData.articleTitle,
        );
        await expect(articlePage.articleBody).toHaveText(
            articleData.articleBody,
        );
    });

    test('Verify error if title was not provided @GAD_R04_01', async () => {
        const expectedAlertMessage = 'Article was not created';
        articleData.articleTitle = '';

        await addArticleView.createNewArticle(articleData);
        await expect(addArticleView.alert).toHaveText(expectedAlertMessage);
    });

    test('Verify error if body was not provided @GAD_R04_01', async () => {
        const expectedAlertMessage = 'Article was not created';
        articleData.articleBody = '';

        await addArticleView.createNewArticle(articleData);
        await expect(addArticleView.alert).toHaveText(expectedAlertMessage);
    });
});

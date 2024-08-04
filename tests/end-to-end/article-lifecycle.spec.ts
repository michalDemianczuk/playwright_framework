import { randomArticle } from '../../src/factories/article.factory';
import { ArticleData } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticleView } from '../../src/views/add-article.view';
import { expect, test } from 'playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('Create, verify and delete article', () => {
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

        await loginPage.goto();
        await loginPage.login(testUser1);
        await articlesPage.goto();
    });

    test('Create new article @GAD_R04_01', async () => {
        articleData = randomArticle();

        await articlesPage.addNewArticleButton.click();
        await expect.soft(addArticleView.header).toBeVisible();

        await addArticleView.createNewArticle(articleData);

        await expect(articlePage.articleTitle).toHaveText(
            articleData.articleTitle,
        );
        await expect(articlePage.articleBody).toHaveText(
            articleData.articleBody,
        );
    });

    test('User can acces single article', async () => {
        await articlesPage.goto();

        await articlesPage.goToArticle(articleData.articleTitle);

        await expect(articlePage.articleTitle).toHaveText(
            articleData.articleTitle,
        );
        await expect(articlePage.articleBody).toHaveText(
            articleData.articleBody,
        );
    });

    test('User can delete his own article', async () => {
        await articlesPage.goToArticle(articleData.articleTitle);

        await articlePage.deleteArticle();

        await articlesPage.waitForPageToLoadUrl();
        const title = await articlesPage.title();
        expect(title).toContain('Articles');

        await articlesPage.searchArticle(articleData.articleTitle);
        await expect(articlesPage.noResultText).toHaveText('No data');
    });
});

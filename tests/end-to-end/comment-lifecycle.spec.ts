import { prepareRandomArticle } from '../../src/factories/article.factory';
import { ArticleDataModel } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticleView } from '../../src/views/add-article.view';
import { AddCommentView } from '../../src/views/add-comment.view';
import { expect, test } from 'playwright/test';

test.describe('Create, verify and delete comment', () => {
    let loginPage: LoginPage;
    let articlesPage: ArticlesPage;
    let addArticleView: AddArticleView;
    let articlePage: ArticlePage;
    let articleData: ArticleDataModel;
    let addCommentView: AddCommentView;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        articlesPage = new ArticlesPage(page);
        addArticleView = new AddArticleView(page);
        articlePage = new ArticlePage(page);
        addCommentView = new AddCommentView(page);
        articleData = prepareRandomArticle();

        await loginPage.goto();
        await loginPage.login(testUser1);
        await articlesPage.goto();
        await articlesPage.addNewArticleButton.click();
        await addArticleView.createNewArticle(articleData);
    });

    test('Create new comment @GAD_R04_01', async () => {
        await articlePage.addCommentButton.click();
        await expect(addCommentView.header).toHaveText('Add New Comment');
        await addCommentView.bodyInput.fill('Hello');
        await addCommentView.saveButton.click();
        await expect(articlePage.alertPopup).toHaveText('Comment was created');
    });
});

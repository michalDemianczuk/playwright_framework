import { prepareRandomArticle } from '../../src/factories/article.factory';
import { prepareRandomComment } from '../../src/factories/comment.factory';
import { ArticleDataModel } from '../../src/models/article.model';
import { CommentDataModel } from '../../src/models/comment.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentPage } from '../../src/pages/comment.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticleView } from '../../src/views/add-article.view';
import { AddCommentView } from '../../src/views/add-comment.view';
import { EditCommentView } from '../../src/views/edit-comment.view';
import { expect, test } from 'playwright/test';

test.describe('Create, verify and delete comment', () => {
    let loginPage: LoginPage;
    let articlesPage: ArticlesPage;
    let addArticleView: AddArticleView;
    let articlePage: ArticlePage;
    let commentPage: CommentPage;
    let articleData: ArticleDataModel;
    let addCommentView: AddCommentView;
    let editCommentView: EditCommentView;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        articlesPage = new ArticlesPage(page);
        addArticleView = new AddArticleView(page);
        articlePage = new ArticlePage(page);
        addCommentView = new AddCommentView(page);
        commentPage = new CommentPage(page);
        editCommentView = new EditCommentView(page);
        articleData = prepareRandomArticle();

        await loginPage.goto();
        await loginPage.login(testUser1);
        await articlesPage.goto();
        await articlesPage.addNewArticleButton.click();
        await addArticleView.createNewArticle(articleData);
    });

    test('Operate on comment @GAD_R04_01', async () => {
        const comment = prepareRandomComment(4);

        await test.step('Create new comment ', async () => {
            //Arrange
            const expectedAddCommentHeader = 'Add New Comment';
            const expectedCommentCreatedPopup = 'Comment was created';
            //Act
            await articlePage.addCommentButton.click();
            await expect
                .soft(addCommentView.header)
                .toHaveText(expectedAddCommentHeader);
            await addCommentView.addComment(comment);
            //Assert
            await expect
                .soft(articlePage.alertPopup)
                .toHaveText(expectedCommentCreatedPopup);
        });

        await test.step('Verify comment ', async () => {
            //Act
            const articleComment = articlePage.getArticleComment(
                comment.commentBody,
            );
            await expect(articleComment.body).toHaveText(comment.commentBody);
            await articleComment.link.click();
            //Assert
            await expect(commentPage.commentBody).toHaveText(
                comment.commentBody,
            );
        });

        let updatedComment: CommentDataModel;
        await test.step('Update comment ', async () => {
            //Arrange
            updatedComment = prepareRandomComment(2);
            const expectedCommentUpdatedPopup = 'Comment was updated';
            //Act
            await commentPage.editButton.click();
            await editCommentView.editComment(updatedComment);
            //Assert
            await expect
                .soft(commentPage.alertPopup)
                .toHaveText(expectedCommentUpdatedPopup);
            await expect(commentPage.commentBody).toHaveText(
                updatedComment.commentBody,
            );
        });

        await test.step('Verify updated comment ', async () => {
            //Act
            await commentPage.retrunButton.click();
            const articleUpdatedComment = articlePage.getArticleComment(
                updatedComment.commentBody,
            );
            //Assert
            await expect(articleUpdatedComment.body).toHaveText(
                updatedComment.commentBody,
            );
        });
    });
});

import { CommentDataModel } from '../models/comment.model';
import { Page } from 'playwright';

export class AddCommentView {
    header = this.page.getByRole('heading', { name: 'Add New Comment' });
    bodyInput = this.page.locator('#body');
    saveButton = this.page.getByRole('button', { name: 'Save' });

    constructor(private page: Page) {}

    async addComment(newComment: CommentDataModel): Promise<void> {
        await this.bodyInput.fill(newComment.commentBody);
        await this.saveButton.click();
    }
}

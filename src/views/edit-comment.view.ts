import { CommentDataModel } from '../models/comment.model';
import { Page } from 'playwright';

export class EditCommentView {
    bodyInput = this.page.getByTestId('body-input');
    updateButton = this.page.getByTestId('update-button');

    constructor(private page: Page) {}

    async editComment(updatedComment: CommentDataModel): Promise<void> {
        await this.bodyInput.fill(updatedComment.commentBody);
        await this.updateButton.click();
    }
}

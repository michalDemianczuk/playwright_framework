import { BasePage } from './base.page';
import { Page } from 'playwright';

export class CommentsPage extends BasePage {
    url = '/comments.html';
    constructor(page: Page) {
        super(page);
    }
}

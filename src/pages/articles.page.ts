import { BasePage } from './base.page';
import { Page } from 'playwright';

export class ArticlesPage extends BasePage {
    url = '/articles.html';
    constructor(page: Page) {
        super(page);
    }
}

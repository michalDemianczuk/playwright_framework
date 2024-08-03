import { MainMenuComponent } from '../components/main-menu.component';
import { BasePage } from './base.page';
import { Page } from 'playwright';

export class ArticlePage extends BasePage {
    url = '/article.html';
    mainMenu = new MainMenuComponent(this.page);

    articleTitle = this.page.getByTestId('article-title');
    articleBody = this.page.getByTestId('article-body');
    constructor(page: Page) {
        super(page);
    }
}

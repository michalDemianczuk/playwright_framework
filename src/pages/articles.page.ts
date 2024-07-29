import { MainMenuComponent } from '../components/main-menu.component';
import { BasePage } from './base.page';
import { Page } from 'playwright';

export class ArticlesPage extends BasePage {
    url = '/articles.html';
    mainMenu = new MainMenuComponent(this.page);
    constructor(page: Page) {
        super(page);
    }
}

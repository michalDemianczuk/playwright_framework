import { MainMenuComponent } from '../components/main-menu.component';
import { BasePage } from './base.page';
import { Page } from 'playwright';

export class CommentsPage extends BasePage {
    url = '/comments.html';
    mainMenu = new MainMenuComponent(this.page);

    constructor(page: Page) {
        super(page);
    }
}

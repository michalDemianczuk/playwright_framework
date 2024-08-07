import { MainMenuComponent } from '../components/main-menu.component';
import { BasePage } from './base.page';
import { Page } from 'playwright';

export class CommentPage extends BasePage {
    url = '/article.html';
    mainMenu = new MainMenuComponent(this.page);
    commentBody = this.page.getByTestId('comment-body');
    editButton = this.page.getByTestId('edit');
    alertPopup = this.page.getByTestId('alert-popup');
    retrunButton = this.page.getByTestId('return');

    constructor(page: Page) {
        super(page);
    }
}

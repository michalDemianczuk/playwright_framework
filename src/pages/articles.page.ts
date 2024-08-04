import { MainMenuComponent } from '../components/main-menu.component';
import { BasePage } from './base.page';
import { Page } from 'playwright';

export class ArticlesPage extends BasePage {
    url = '/articles.html';
    addNewArticleButton = this.page.locator('#add-new');
    searchInput = this.page.getByTestId('search-input');
    searchButton = this.page.getByTestId('search-button');
    noResultText = this.page.getByTestId('no-results');

    mainMenu = new MainMenuComponent(this.page);
    constructor(page: Page) {
        super(page);
    }

    async goToArticle(title: string): Promise<void> {
        await this.page.getByText(title).click();
    }

    async searchArticle(phrase: string): Promise<void> {
        await this.searchInput.fill(phrase);
        await this.searchButton.click();
    }
}

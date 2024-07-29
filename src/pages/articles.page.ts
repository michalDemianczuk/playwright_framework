import { Page } from 'playwright';

export class ArticlesPage {
    url = '/articles.html';
    constructor(private page: Page) {}

    async goto(): Promise<void> {
        await this.page.goto(this.url);
    }

    async title(): Promise<string> {
        return this.page.title();
    }
}

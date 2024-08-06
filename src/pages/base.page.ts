import { Page } from 'playwright';

export class BasePage {
    url = '';
    constructor(protected page: Page) {}

    async goto(): Promise<void> {
        await this.page.goto(this.url);
    }

    async getTitle(): Promise<string> {
        return this.page.title();
    }

    async waitForPageToLoadUrl(): Promise<void> {
        await this.page.waitForURL(this.url);
    }
}

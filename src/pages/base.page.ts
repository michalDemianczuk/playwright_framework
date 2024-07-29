import { Page } from 'playwright';

export class BasePage {
    url = '';
    constructor(private page: Page) {}

    async goto(): Promise<void> {
        await this.page.goto(this.url);
    }

    async title(): Promise<string> {
        return this.page.title();
    }
}

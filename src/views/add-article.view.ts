import { ArticleData } from '../models/article.model';
import { Page } from 'playwright';

export class AddArticleView {
    header = this.page.getByRole('heading', { name: 'Add New Entry' });
    titleInput = this.page.getByTestId('title-input');
    bodyInput = this.page.getByTestId('body-text');
    saveButton = this.page.getByTestId('save');

    constructor(private page: Page) {}

    async createNewArticle(articleData: ArticleData): Promise<void> {
        await this.titleInput.fill(articleData.articleTitle);
        await this.bodyInput.fill(articleData.articleBody);
        await this.saveButton.click();
    }
}

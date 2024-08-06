import { ArticleDataModel } from '../models/article.model';
import { Page } from 'playwright';

export class AddArticleView {
    header = this.page.getByRole('heading', { name: 'Add New Entry' });
    titleInput = this.page.getByTestId('title-input');
    bodyInput = this.page.getByTestId('body-text');
    saveButton = this.page.getByTestId('save');
    alert = this.page.getByTestId('alert-popup');

    constructor(private page: Page) {}

    async createNewArticle(articleData: ArticleDataModel): Promise<void> {
        await this.titleInput.fill(articleData.articleTitle);
        await this.bodyInput.fill(articleData.articleBody);
        await this.saveButton.click();
    }
}

import { ArticleDataModel } from '../models/article.model';
import { faker } from '@faker-js/faker';

export function prepareRandomArticle(titleLenght?: number): ArticleDataModel {
    let title: string;
    if (titleLenght) title = faker.string.alpha(titleLenght);
    else title = faker.lorem.sentence();
    const body = faker.lorem.word();

    return {
        articleTitle: title,
        articleBody: body,
    };
}

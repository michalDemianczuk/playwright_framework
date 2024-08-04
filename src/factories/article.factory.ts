import { ArticleData } from '../models/article.model';
import { faker } from '@faker-js/faker';

export function randomArticle(titleLenght?: number): ArticleData {
    let title: string;
    if (titleLenght) title = faker.string.alpha(titleLenght);
    else title = faker.lorem.sentence();
    const body = faker.lorem.word();

    return {
        articleTitle: title,
        articleBody: body,
    };
}

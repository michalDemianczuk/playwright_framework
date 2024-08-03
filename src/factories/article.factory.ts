import { ArticleData } from '../models/article.model';
import { faker } from '@faker-js/faker';

export function randomArticle(): ArticleData {
    return {
        articleTitle: faker.lorem.word(),
        articleBody: faker.lorem.word(),
    };
}

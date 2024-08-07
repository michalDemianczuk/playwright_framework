import { CommentDataModel } from '../models/comment.model';
import { faker } from '@faker-js/faker';

export function prepareRandomComment(bodySentences?: number): CommentDataModel {
    const body = faker.lorem.sentences(bodySentences);

    return {
        commentBody: body,
    };
}

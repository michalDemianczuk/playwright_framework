import { LoginDataModel } from '../models/login.model';

export const testUser1: LoginDataModel = {
    userEmail: process.env.USER_EMAIL,
    userPassword: process.env.USER_PASSWORD,
};

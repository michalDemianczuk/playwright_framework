import {LoginData} from "../models/login.model";

export const testUser1: LoginData = {
    userEmail: process.env.USER_EMAIL,
    userPassword: process.env.USER_PASSWORD,
};

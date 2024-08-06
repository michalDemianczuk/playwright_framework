import { LoginDataModel } from '../models/login.model';
import {USER_EMAIL, USER_PASSWORD} from "../env.config,ts";

export const testUser1: LoginDataModel = {
    userEmail: USER_EMAIL,
    userPassword: USER_PASSWORD,
};

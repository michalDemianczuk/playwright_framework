import { RegisterDataModel } from '../models/user.model';
import { faker } from '@faker-js/faker';

export function randomUser(): RegisterDataModel {
    const registerUser: RegisterDataModel = {
        userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
        userLastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
        userEmail: '',
        userPassword: faker.internet.password(),
    };

    registerUser.userEmail = faker.internet.email({
        firstName: registerUser.userFirstName,
        lastName: registerUser.userLastName,
    });

    return registerUser;
}

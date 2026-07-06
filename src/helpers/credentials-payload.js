import { faker } from '@faker-js/faker';

export function createValidRegistrationData() {
    return {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email: faker.internet.email(),
        username: faker.internet.username(),
        phoneNumber: faker.phone.number({ style: 'international' }),
        password: faker.internet.password(),
        role: "USER"
    };
}
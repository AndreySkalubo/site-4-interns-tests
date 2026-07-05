import { faker } from '@faker-js/faker';

export class Credentials {
    constructor() {
        this.name = faker.person.firstName();
        this.surname = faker.person.lastName();
        this.email = faker.internet.email();
        this.username = faker.internet.username();
        this.phone = faker.phone.number({ style: 'international' });
        this.password = faker.internet.password();
    }
}
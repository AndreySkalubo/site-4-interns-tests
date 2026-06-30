import { faker } from '@faker-js/faker';

export class Credentials {
    constructor() {
        this.name = faker.person.firstName();
        this.surname = faker.person.lastName();
        this.email = faker.internet.email();
        this.username = faker.internet.username();
        this.phone = "+" + faker.number.int(375290000000, 375299999999);
        this.password = faker.internet.password();
    }
}
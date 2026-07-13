import { faker } from '@faker-js/faker';

export class Credentials {
    name: string;
    surname: string;
    email: string;
    username: string;
    phone: string;
    password: string;
    constructor() {
        this.name = faker.person.firstName();
        this.surname = faker.person.lastName();
        this.email = faker.internet.email();
        this.username = faker.internet.username();
        this.phone = faker.phone.number({ style: 'international' });
        this.password = faker.internet.password();
    }
    getPayload() {
        return {
            firstname: this.name,
            lastname: this.surname,
            email: this.email,
            username: this.username,
            phoneNumber: this.phone,
            password: this.password,
            role: "USER"
        };
    }
}
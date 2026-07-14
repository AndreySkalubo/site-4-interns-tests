import { Locator, Page } from "@playwright/test";
import { LoginPage } from "./login-page";

export class RegistrationPage {
    readonly page: Page;
    readonly nameLocator: Locator;
    readonly surnameLocator: Locator;
    readonly emailLocator: Locator;
    readonly usernameLocator: Locator;
    readonly phoneLocator: Locator;
    readonly passwordLocator: Locator;
    readonly registerButtonLocator: Locator;
    readonly loginRedirectButtonLocator: Locator;
    constructor(page: Page) {
        this.page = page;
        this.nameLocator = page.getByRole('textbox', { name: 'Имя' });
        this.surnameLocator = page.getByRole('textbox', { name: 'Фамилия' });
        this.emailLocator = page.getByRole('textbox', { name: 'Email' });
        this.usernameLocator = page.getByRole('textbox', { name: 'Username' });
        this.phoneLocator = page.getByRole('textbox', { name: 'Телефон' });
        this.passwordLocator = page.getByRole('textbox', { name: 'Пароль' });
        this.registerButtonLocator = page.getByRole('button', { name: 'Зарегистрироваться' });
        this.loginRedirectButtonLocator = page.getByRole('link', { name: 'Войти' });
    }

    async register({ firstname, lastname, email, username, phoneNumber, password }: {
        firstname: string;
        lastname: string;
        email: string;
        username: string;
        phoneNumber: string;
        password: string;
    }) {
        await this.nameLocator.fill(firstname);
        await this.surnameLocator.fill(lastname);
        await this.emailLocator.fill(email);
        await this.usernameLocator.fill(username);
        await this.phoneLocator.fill(phoneNumber);
        await this.passwordLocator.fill(password);
        await this.registerButtonLocator.click();
    }

    async verifyRegistrationSuccess(loginPage: LoginPage) {
        await loginPage.successfulRegistrationMessageLocator.waitFor({ state: 'attached' });
    }

    async verifyRegistrationFailure(loginPage: LoginPage) {
        await loginPage.successfulRegistrationMessageLocator.waitFor({ state: 'detached' });
    }
}
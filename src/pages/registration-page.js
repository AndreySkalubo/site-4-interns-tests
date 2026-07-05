import { expect, Locator, Page } from '@playwright/test';

export class RegistrationPage {
    constructor(page) {
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

    async register(name, surname, email, username, phone, password) {
        await this.nameLocator.fill(name);
        await this.surnameLocator.fill(surname);
        await this.emailLocator.fill(email);
        await this.usernameLocator.fill(username);
        await this.phoneLocator.fill(phone);
        await this.passwordLocator.fill(password);
        await this.registerButtonLocator.click();
    }

    async verifyRegistrationSuccess(loginPage) {
        await loginPage.successfulRegistrationMessageLocator.waitFor({ state: 'attached' });
    }

    async verifyRegistrationFailure(loginPage) {
        await loginPage.successfulRegistrationMessageLocator.waitFor({ state: 'detached' });
    }
}
import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailLocator = page.getByRole('textbox', { name: 'Email' });
        this.passwordLocator = page.getByRole('textbox', { name: 'Пароль' });
        this.loginButtonLocator = page.getByRole('button', { name: 'Войти' });
        this.registrationButtonLocator = page.getByRole('link', { name: 'Зарегистрироваться' });
    }
    async openLoginPage() {
        await this.page.goto('http://localhost:5173/login');
        await this.page.waitForURL('http://localhost:5173/login');
        await expect(this.page).toHaveURL('http://localhost:5173/login');
    }
    async login(username, password) {
        await this.emailLocator.fill(username);
        await this.passwordLocator.fill(password);
        await this.loginButtonLocator.click();
    }
    async goToRegistrationPage() {
        await this.registrationButtonLocator.click();
        await this.page.waitForURL('http://localhost:5173/register');
    }
}

// module.exports = LoginPage;
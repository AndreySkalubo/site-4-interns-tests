import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailLocator = page.getByRole('textbox', { name: 'Email' });
        this.passwordLocator = page.getByRole('textbox', { name: 'Пароль' });
        this.loginButtonLocator = page.getByRole('button', { name: 'Войти' });
        this.registrationButtonLocator = page.getByRole('link', { name: 'Зарегистрироваться' });
        this.successfulRegistrationMessageLocator = page.getByText('Регистрация прошла успешно! Теперь вы можете войти.');
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
    async loginAsUser1() {
        await this.openLoginPage();
        await this.login('user1@test.com', 'user123');

    }
    async loginAsAdmin() {
        await this.openLoginPage();
        await this.login('admin@test.com', 'admin123');

    }
}

// module.exports = LoginPage;
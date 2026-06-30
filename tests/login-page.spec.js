import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../pages/login-page.js';
import { RegistrationPage } from '../pages/registration-page.js';
import { CataloguePage } from '../pages/catalogue-page.js';
import { Credentials } from '../helpers/credentials.js';

test.describe('Login page tests', () => {
    test('admin login', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();

        await loginPage.login('admin@test.com', 'admin123');
        await page.waitForURL('http://localhost:5173/');

    });

    test('user login', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();

        await loginPage.login('user1@test.com', 'user123');
        await page.waitForURL('http://localhost:5173/');

    });

    test('nonexistent data login', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();

        await loginPage.login('user1@test.co', 'user12');
        await expect(page).not.toHaveURL('http://localhost:5173/');

    });

    test('empty password login', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();

        await loginPage.login('user1@test.com', '');
        await expect(page).not.toHaveURL('http://localhost:5173/');

    });

    test('empty email login', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();

        await loginPage.login('', 'user123');
        await expect(page).not.toHaveURL('http://localhost:5173/');

    });

    test('empty data login', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();

        await loginPage.login('', '');
        await expect(page).not.toHaveURL('http://localhost:5173/');
    });

    test('correct data registration', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();
        await loginPage.goToRegistrationPage();

        const registrationPage = new RegistrationPage(page);
        const credentials = new Credentials();
        await registrationPage.register(
            credentials.name,
            credentials.surname,
            credentials.email,
            credentials.username,
            credentials.phone,
            credentials.password
        );
        await registrationPage.verifyRegistrationSuccess();

    });

    test('temp mail registration', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();
        await loginPage.goToRegistrationPage();

        const registrationPage = new RegistrationPage(page);
        const credentials = new Credentials();
        await registrationPage.register(
            credentials.name,
            credentials.surname,
            `${credentials.name}${credentials.surname}@yzcalo.com`,
            credentials.username,
            credentials.phone,
            credentials.password
        );
        await registrationPage.verifyRegistrationSuccess();

    });

    test('registration with invalid credentials', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();
        await loginPage.goToRegistrationPage();

        const registrationPage = new RegistrationPage(page);
        const credentials = new Credentials();
        await registrationPage.register(
            credentials.name,
            credentials.surname,
            credentials.email.slice(0, -1),
            credentials.username,
            credentials.phone.slice(0, -3),
            credentials.password
        );
        await registrationPage.verifyRegistrationFailure();
    });

    test('уже есть аккаунт? войти', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();
        await loginPage.goToRegistrationPage();

        const registrationPage = new RegistrationPage(page);
        await expect(page).toHaveURL('http://localhost:5173/register');
    });

    test('registration with existing email', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();
        await loginPage.goToRegistrationPage();

        const registrationPage = new RegistrationPage(page);
        const credentials = new Credentials();
        await registrationPage.register(
            credentials.name,
            credentials.surname,
            'user1@test.com',
            credentials.username,
            credentials.phone,
            credentials.password
        );
        await registrationPage.verifyRegistrationFailure();
    });
});
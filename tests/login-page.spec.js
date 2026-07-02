import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../pages/login-page.js';
import { RegistrationPage } from '../pages/registration-page.js';
import { CataloguePage } from '../pages/catalogue-page.js';
import { Credentials } from '../helpers/credentials.js';
import { CartPage } from "../pages/cart-page";

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
        await registrationPage.verifyRegistrationSuccess(loginPage);

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
        await registrationPage.verifyRegistrationSuccess(loginPage);

    });

    test('registration with invalid email', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();
        await loginPage.goToRegistrationPage();

        const registrationPage = new RegistrationPage(page);
        const credentials = new Credentials();
        const invalidEmail = faker.internet.email().slice(0, -3);
        await registrationPage.register(
            credentials.name,
            credentials.surname,
            invalidEmail,
            credentials.username,
            credentials.phone,
            credentials.password
        );
        console.log(credentials.name, credentials.surname, invalidEmail, credentials.username, credentials.phone, credentials.password);
        await registrationPage.verifyRegistrationFailure(loginPage);
    });

    test('registration with invalid phone number', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();
        await loginPage.goToRegistrationPage();

        const registrationPage = new RegistrationPage(page);
        const credentials = new Credentials();
        const invalidPhone = '1234567890'; // Example of an invalid phone number
        await registrationPage.register(
            credentials.name,
            credentials.surname,
            credentials.email,
            credentials.username,
            invalidPhone,
            credentials.password
        );
        console.log(credentials.name, credentials.surname, credentials.email, credentials.username, invalidPhone, credentials.password);
        await registrationPage.verifyRegistrationFailure(loginPage);

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
        await registrationPage.verifyRegistrationFailure(loginPage);
    });

    test('registration with existing phone number', async ({ page }) => {

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
            '+10000000000',
            credentials.password
        );
        await registrationPage.verifyRegistrationFailure(loginPage);
    });

    test('registration with existing username', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();
        await loginPage.goToRegistrationPage();

        const registrationPage = new RegistrationPage(page);
        const credentials = new Credentials();
        await registrationPage.register(
            credentials.name,
            credentials.surname,
            credentials.email,
            'user1',
            credentials.phone,
            credentials.password
        );
        await registrationPage.verifyRegistrationFailure(loginPage);
    });
});

test.describe('Catalogue and product tests', () => {

    test('add products to cart', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();
        await loginPage.login('user1@test.com', 'user123');

        const cataloguePage = new CataloguePage(page);
        await cataloguePage.addProductsToCart(3);

        await cataloguePage.gotoCartPage();

        const cartPage = new CartPage(page);
        await cartPage.verifyCartItemsCount(3);
        await cartPage.removeAllItemsFromCart();

    });

    test('go to several random products pages', async ({ page }) => {

        const cataloguePage = new CataloguePage(page);
        await cataloguePage.openCataloguePage();

        for (let i = 0; i < 3; i++) {
            const productPage = new ProductPage(page);
            await cataloguePage.openRandomProduct();
            await productPage.verifyProductPageOpened();
            // await page.goBack();
        }
    });

    test('add products via product page', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();
        await loginPage.login('user1@test.com', 'user123');

        const cataloguePage = new CataloguePage(page);
        await cataloguePage.openCataloguePage();
        await cataloguePage.openRandomProduct();

        const productPage = new ProductPage(page);
        await productPage.addToCart();

        const cartPage = new CartPage(page);
        await cartPage.openCartPage();
        await cartPage.verifyCartItemsCount(1);
    });

    test('verify product images presence', async ({ page }) => {

        const cataloguePage = new CataloguePage(page);
        await cataloguePage.openCataloguePage();
        await cataloguePage.verifyAllProductImagesVisible();
    });

    test('verify dynamic image zoom', async ({ page }) => {

        const cataloguePage = new CataloguePage(page);
        await cataloguePage.openCataloguePage();
        await cataloguePage.openRandomProduct();

        const productPage = new ProductPage(page);
        await productPage.hoverOverImage();
        await productPage.verifyImageZoomed();
    });

    test('verify page zoom in and out', async ({ page }) => {

        const cataloguePage = new CataloguePage(page);
        await cataloguePage.openCataloguePage();

        await page.keyboard.down('Control');
        await page.keyboard.press('+');
        await page.keyboard.press('+');
        await page.keyboard.up('Control');
        await expect(page).toHaveURL('http://localhost:5173/catalogue');

        await page.keyboard.down('Control');
        await page.keyboard.press('-');
        await page.keyboard.press('-');
        await page.keyboard.up('Control');
        await expect(page).toHaveURL('http://localhost:5173/catalogue');
    });

});
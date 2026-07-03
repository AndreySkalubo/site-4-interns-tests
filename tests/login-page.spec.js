import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../pages/login-page.js';
import { RegistrationPage } from '../pages/registration-page.js';
import { CataloguePage } from '../pages/catalogue-page.js';
import { Credentials } from '../helpers/credentials.js';
import { CartPage } from "../pages/cart-page";
import { ProductPage } from "../pages/product-page";
import { HeaderComponent } from "../pages/components/header-component";
import { AdminPanel } from "../pages/admin-panel.js";
import { OrdersPage } from "../pages/orders-page.js";
import { ProfilePage } from "../pages/profile-page.js";

//Добавить комментарии!!

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
        await loginPage.loginAsUser1();

        const headerComponent = new HeaderComponent(page);
        await headerComponent.goToCartPage();

        const cartPage = new CartPage(page);
        await cartPage.removeAllItemsFromCart();

        await headerComponent.returnToCatalogue();

        const cataloguePage = new CataloguePage(page);
        const numberOfProductsToAdd = 5;
        await cataloguePage.addProductsToCart(numberOfProductsToAdd);

        await headerComponent.goToCartPage();

        await cartPage.verifyCartItemsCount(numberOfProductsToAdd);
        await cartPage.removeAllItemsFromCart();

    });

    test('go to several random products pages', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.loginAsUser1();

        const cataloguePage = new CataloguePage(page);
        const productPage = new ProductPage(page);

        const numberOfProductsToVisit = 70;
        for (let i = 0; i < numberOfProductsToVisit; i++) {
            await cataloguePage.openRandomProduct();
            await expect(productPage.isProductPageOpened()).toBeTruthy();
            await page.goBack();
        }
    });

    test('add products via product page', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.loginAsUser1();

        const cataloguePage = new CataloguePage(page);
        await cataloguePage.openRandomProduct();

        const productPage = new ProductPage(page);
        await productPage.addToCart();

        const cartPage = new CartPage(page);
        const headerComponent = new HeaderComponent(page);
        await headerComponent.goToCartPage();
        await cartPage.verifyCartItemsCount(1);
        await cartPage.removeAllItemsFromCart();
    });

    //На странице каталога нет некоторых изображений, поэтому тест падает.
    test.fail('verify product images presence', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.loginAsUser1();

        const cataloguePage = new CataloguePage(page);
        await cataloguePage.validateImageLinks();
    });

    test('make an order', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.loginAsUser1();

        const numberOfItems = 3;
        const cataloguePage = new CataloguePage(page);
        await cataloguePage.addProductsToCart(numberOfItems);

        const headerComponent = new HeaderComponent(page);
        await headerComponent.goToCartPage();

        const cartPage = new CartPage(page);
        await cartPage.makeOrder();
        await expect(cartPage.isCartEmpty()).toBeTruthy();
    });

    test('make an order with empty cart is impossible', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.loginAsUser1();

        const headerComponent = new HeaderComponent(page);
        await headerComponent.goToCartPage();

        const cartPage = new CartPage(page);
        await expect(cartPage.makeOrderButton).toBeDisabled();

    });

    test('test header buttons', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAsAdmin();

        //Проверка кнопки корзины
        const headerComponent = new HeaderComponent(page);
        await headerComponent.goToCartPage();
        const cartPage = new CartPage(page);
        await expect(cartPage.makeOrderButton).toBeAttached();

        //Проверка возврата в каталог
        await headerComponent.returnToCatalogue();
        const cataloguePage = new CataloguePage(page);
        await expect(cataloguePage.catalogueHeading).toBeAttached();

        await headerComponent.goToAdminPanel();
        const adminPanel = new AdminPanel(page);
        await expect(adminPanel.returnBackButton).toBeAttached();

        await adminPanel.returnToCatalogue();
        await page.waitForLoadState('networkidle');
        const ordersPage = new OrdersPage(page);
        await headerComponent.goToOrdersPage();
        await expect(ordersPage.ordersHeading).toBeAttached();

        await headerComponent.openProfileDropdown();
        await headerComponent.goToProfilePage();
        const profilePage = new ProfilePage(page);
        await expect(profilePage.profileHeading).toBeAttached();

        await headerComponent.openProfileDropdown();
        await headerComponent.goToOrderHistoryPage();
        await expect(ordersPage.ordersHeading).toBeAttached();

        await headerComponent.openProfileDropdown();
        await headerComponent.exitProfile();
        await expect(loginPage.emailLocator).toBeAttached();
    });

});

test.describe('Admin panel tests', () => {
    test('create product', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAsAdmin();

        const headerComponent = new HeaderComponent(page);
        await headerComponent.goToAdminPanel();
        const adminPanel = new AdminPanel(page);
        await adminPanel.goToProductMenu();
        await adminPanel.clickAddProductButton();
        await adminPanel.fillProductForm(
            'Test Product',
            'This is a test product description.',
            '1000',
            'https://i0.wp.com/www.ian.ng/wp-content/uploads/2021/01/product-strategy.png?fit=1000%2C523&ssl=1'
        );
        await adminPanel.clickProductSaveButton();

        const cataloguePage = new CataloguePage(page);
        await adminPanel.returnToCatalogue();
        await cataloguePage.validateProduct('Test Product');
    });
});
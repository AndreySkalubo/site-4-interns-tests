import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../src/pages/login-page.js';
import { RegistrationPage } from '../src/pages/registration-page.js';
import { CataloguePage } from '../src/pages/catalogue-page.js';
import { CartPage } from "../src/pages/cart-page.js";
import { ProductPage } from "../src/pages/product-page.js";
import { HeaderComponent } from "../src/pages/components/header-component.js";
import { AdminPanel } from "../src/pages/admin-panel.js";
import { OrdersPage } from "../src/pages/orders-page.js";
import { ProfilePage } from "../src/pages/profile-page.js";
import { validateProduct, validateProductDeleted } from "../src/helpers/validate-product.js";
import { testConfigCredentials } from '../src/config/test-config-credentials.js';
import { urls } from "../src/config/test-config-urls.js";
import { createValidRegistrationData } from '../src/helpers/credentials-payload.js';
import { testConfigProducts } from '../src/config/test-config-products.js';
import { ProductService } from '../src/api/product-service.js';

//Добавить комментарии!!

test.describe('Login page tests', () => {

    test('admin login', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();

        await loginPage.login(testConfigCredentials.admin.email, testConfigCredentials.admin.password);
        await page.waitForURL(urls.baseURL);

    });

    test('user login', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();

        await loginPage.login(testConfigCredentials.user1.email, testConfigCredentials.user1.password);
        await page.waitForURL(urls.baseURL);

    });

    test('nonexistent data login', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();

        await loginPage.login(testConfigCredentials.user1BadData.email, testConfigCredentials.user1BadData.password);
        await expect(page).not.toHaveURL(urls.baseURL);

    });

    test('empty password login', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();

        await loginPage.login(testConfigCredentials.user1.email, '');
        await expect(page).not.toHaveURL(urls.baseURL);

    });

    test('empty email login', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();

        await loginPage.login('', testConfigCredentials.user1.password);
        await expect(page).not.toHaveURL(urls.baseURL);

    });

    test('empty data login', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();

        await loginPage.login('', '');
        await expect(page).not.toHaveURL(urls.baseURL);
    });

    test('correct data registration', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();
        await loginPage.goToRegistrationPage();

        const registrationPage = new RegistrationPage(page);
        await registrationPage.register(createValidRegistrationData());
        await registrationPage.verifyRegistrationSuccess(loginPage);

    });

    test('temp mail registration', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();
        await loginPage.goToRegistrationPage();

        const registrationPage = new RegistrationPage(page);
        await registrationPage.register({
            ...createValidRegistrationData(),
            email: faker.internet.email({ provider: 'gmeenramy.com' })
        });
        await registrationPage.verifyRegistrationSuccess(loginPage);

    });

    test('registration with invalid email', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();
        await loginPage.goToRegistrationPage();

        const registrationPage = new RegistrationPage(page);
        await registrationPage.register({
            ...createValidRegistrationData(),
            email: faker.internet.email({ provider: "" })
        });
        await registrationPage.verifyRegistrationFailure(loginPage);
    });

    test('registration with invalid phone number', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();
        await loginPage.goToRegistrationPage();

        const registrationPage = new RegistrationPage(page);
        await registrationPage.register({
            ...createValidRegistrationData(),
            phoneNumber: faker.phone.number()
        });
        await registrationPage.verifyRegistrationFailure(loginPage);

    });

    test('уже есть аккаунт? войти', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();
        await loginPage.goToRegistrationPage();

        await expect(page).toHaveURL(urls.webRegistrationURL);
    });

    test('registration with existing email', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();
        await loginPage.goToRegistrationPage();

        const registrationPage = new RegistrationPage(page);
        await registrationPage.register({
            ...createValidRegistrationData(),
            email: testConfigCredentials.existingUser.email
        });
        await registrationPage.verifyRegistrationFailure(loginPage);
    });

    test('registration with existing phone number', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();
        await loginPage.goToRegistrationPage();

        const registrationPage = new RegistrationPage(page);
        await registrationPage.register({
            ...createValidRegistrationData(),
            phoneNumber: testConfigCredentials.existingUser.phoneNumber
        });
        await registrationPage.verifyRegistrationFailure(loginPage);
    });

    test('registration with existing username', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.openLoginPage();
        await loginPage.goToRegistrationPage();

        const registrationPage = new RegistrationPage(page);
        await registrationPage.register({
            ...createValidRegistrationData(),
            username: testConfigCredentials.existingUser.username
        });
        await registrationPage.verifyRegistrationFailure(loginPage);
    });
});

test.describe('Catalogue and product tests', () => {
    test.describe.configure({ mode: 'serial' });

    test.beforeEach(async ({ request }) => {
        const produdctService = new ProductService(request);
        produdctService.clearBucket();
    });

    test('add product to cart', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAsUser1();

        const headerComponent = new HeaderComponent(page);
        await headerComponent.goToCartPage();

        const cartPage = new CartPage(page);
        await cartPage.removeAllItemsFromCart();

        await headerComponent.returnToCatalogue();

        const cataloguePage = new CataloguePage(page);
        // const numberOfProductsToAdd = 5;
        const addedProductName = await cataloguePage.addRandProductToCart();
        console.log(addedProductName);

        await headerComponent.goToCartPage();

        await cartPage.verifyCartItem(addedProductName);
        await cartPage.removeAllItemsFromCart();

    });

    test('go to several random products pages', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAsUser1();

        const cataloguePage = new CataloguePage(page);
        const productPage = new ProductPage(page);

        const numberOfProductsToVisit = 5;
        for (let i = 0; i < numberOfProductsToVisit; i++) {
            await cataloguePage.openRandomProduct();
            expect(productPage.isProductPageOpened()).toBeTruthy();
            await page.goBack();
        }
    });

    test('add products via product page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAsUser1();

        const cartPage = new CartPage(page);

        const cataloguePage = new CataloguePage(page);
        await cataloguePage.openRandomProduct();

        const productPage = new ProductPage(page);
        const itemName = await productPage.addToCart();

        const headerComponent = new HeaderComponent(page);
        await headerComponent.goToCartPage();
        await cartPage.verifyCartItem(itemName);
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

        const cataloguePage = new CataloguePage(page);
        await cataloguePage.addRandProductToCart();

        const headerComponent = new HeaderComponent(page);
        await headerComponent.goToCartPage();

        const cartPage = new CartPage(page);
        await cartPage.makeOrder();
        await headerComponent.goToCartPage();
        await expect(cartPage.makeOrderButton).toBeDisabled();

    });

});

test.describe('Admin panel tests', () => {
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

    test('create product', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAsAdmin();

        const headerComponent = new HeaderComponent(page);
        await headerComponent.goToAdminPanel();
        const adminPanel = new AdminPanel(page);
        await adminPanel.goToProductMenu();
        await adminPanel.clickAddProductButton();
        await adminPanel.fillProductForm(testConfigProducts.testProduct);

        await adminPanel.clickSaveButton();

        await adminPanel.returnToCatalogue();
        await validateProduct('Test Product', page);
    });
    test('edit product', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAsAdmin();

        const headerComponent = new HeaderComponent(page);
        await headerComponent.goToAdminPanel();
        const adminPanel = new AdminPanel(page);
        await adminPanel.goToProductMenu();
        await adminPanel.clickEditLastProductButton();
        await adminPanel.fillProductForm(testConfigProducts.testProduct);
        await adminPanel.clickSaveButton();

        await adminPanel.returnToCatalogue();
        await validateProduct('Test Product Edited', page);
    });
    test('delete product', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAsAdmin();

        const headerComponent = new HeaderComponent(page);
        await headerComponent.goToAdminPanel();
        const adminPanel = new AdminPanel(page);
        await adminPanel.goToProductMenu();
        await adminPanel.clickAddProductButton();
        const deletableProductID = Math.random();
        const deletableProduct = { ...testConfigProducts.testProduct, name: `Deletable Product # ${deletableProductID}` };
        await adminPanel.fillProductForm(deletableProduct);
        await adminPanel.clickSaveButton();
        await adminPanel.clickProductDeleteButton(deletableProduct.name);

        await adminPanel.returnToCatalogue();
        await validateProductDeleted(deletableProduct.name, page);
    });
    test('create warehouse', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAsAdmin();

        const headerComponent = new HeaderComponent(page);
        await headerComponent.goToAdminPanel();
        const adminPanel = new AdminPanel(page);

        await adminPanel.goToWarehouseMenu();
        await adminPanel.clickAddWarehouseButton();
        await adminPanel.fillWarehouseForm(testConfigProducts.testWarehouse);
        await adminPanel.clickSaveButton();

        await validateProduct('Test Warehouse', page);
    });
});
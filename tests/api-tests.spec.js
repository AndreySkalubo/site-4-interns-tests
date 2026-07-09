import { test } from "@playwright/test";
import { testConfigCredentials } from "../src/config/test-config-credentials";
import { createData, deleteData, readData, updateData } from "../src/api/crud-functions";
import { urls } from "../src/config/test-config-urls";
import { faker } from "@faker-js/faker";
import { createValidRegistrationData } from "../src/helpers/credentials-payload";
import { ProductService } from "../src/api/product-service";
import { testConfigProducts } from "../src/config/test-config-products";
import { giveRandomItemId } from "../src/helpers/give-random-item-id";
import { UserMenuService } from "../src/api/admin-service";

test.describe('Authentication tests', () => {

    test('Login test admin', async ({ request }) => {
        //201 Created
        await createData(request, urls.loginURL, testConfigCredentials.admin, 201);
    });

    test('Login test user1', async ({ request }) => {
        //201 Created
        await createData(request, urls.loginURL, testConfigCredentials.user1, 201);
    });

    test('Login test bad email', async ({ request }) => {
        //400 Bad Request
        await createData(request, urls.loginURL, testConfigCredentials.user1BadData, 400);
    });

    test('Login test non-existent email', async ({ request }) => {
        //401 Unauthorized
        await createData(request, urls.loginURL, testConfigCredentials.nonExistentData, 401);
    });

    test('Login test empty password', async ({ request }) => {
        //400 Bad Request
        await createData(request, urls.loginURL, testConfigCredentials.emptyPassword, 400);
    });

    test('Login test empty email', async ({ request }) => {
        //400 Bad Request
        await createData(request, urls.loginURL, testConfigCredentials.emptyEmail, 400);
    });

    test('Login test empty email and password', async ({ request }) => {
        //400 Bad Request
        await createData(request, urls.loginURL, testConfigCredentials.emptyLoginData, 400);
    });

    test('SQL injection #1', async ({ request }) => {
        //400 Bad Request
        await createData(request, urls.loginURL, testConfigCredentials.sqlInjection, 400);
    });

    test('SQL injection #2', async ({ request }) => {
        //400 Bad Request
        await createData(request, urls.loginURL, testConfigCredentials.sqlInjection, 400);
    });

});

test.describe('Registration tests', () => {

    test('Registration test', async ({ request }) => {
        await createData(request, urls.registrationURL, createValidRegistrationData(), 201);
    });

    test('Registration test temp mail', async ({ request }) => {
        await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                email: faker.internet.email({ provider: 'gmeenramy.com' })
            },
            201
        );
    });

    test('Registration test incorrect phone number format', async ({ request }) => {
        await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                phoneNumber: faker.phone.number()
            },
            400
        );
    });

    test('Registration test incorrect email', async ({ request }) => {
        await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                email: faker.internet.email({ provider: null })
            },
            400
        );
    });

    test('Registration test empty first name', async ({ request }) => {
        await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                firstname: null
            },
            400
        );
    });

    test('Registration test empty last name', async ({ request }) => {
        await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                lastname: null
            },
            400
        );
    });

    test('Registration test empty email', async ({ request }) => {
        await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                email: null
            },
            400
        );
    });

    test('Registration test empty username', async ({ request }) => {
        await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                username: null
            },
            400
        );
    });

    test('Registration test empty phone number', async ({ request }) => {
        await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                phoneNumber: null
            },
            400
        );
    });

    test('Registration test empty password', async ({ request }) => {
        await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                password: null
            },
            400
        );
    });

    test('Registration test empty role', async ({ request }) => {
        await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                role: null
            },
            400
        );
    });

    test('Registration test existing mail', async ({ request }) => {
        await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                email: testConfigCredentials.existingUser.email
            },
            409
        );
    });
    //The system throws 500 Internal Server Error when trying to create a user with existing username
    test.fail('Registration test existing username', async ({ request }) => {
        await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                username: testConfigCredentials.existingUser.username
            },
            400
        );
    });
    //The system allows creating a user with existing phone number
    test.fail('Registration test existing phone number', async ({ request }) => {
        await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                phoneNumber: testConfigCredentials.existingUser.phoneNumber
            },
            400
        );
    });
});

test.describe('Product tests', () => {

    test.describe.configure({ mode: 'serial' });

    test('Add and delete product', async ({ request }) => {
        const productService = new ProductService(request);
        const randomItem = giveRandomItemId();
        await productService.addProductToBucket(randomItem, 201);

        await productService.removeProductFromBucket(randomItem, 200);

    });

    test('Get product', async ({ request }) => {
        const productService = new ProductService(request);
        const randomItem = giveRandomItemId();
        await productService.getProduct(randomItem, 200);
    });

    test('Get non-existent product', async ({ request }) => {
        const productService = new ProductService(request);
        const randomItem = giveRandomItemId() - testConfigProducts.firstProductEntryID;
        await productService.getProduct(randomItem, 404);
    });

    test('Make an order', async ({ request }) => {
        const productService = new ProductService(request);
        const payload = {
            "items": [
                {
                    "product_id": giveRandomItemId(),
                    "quantity": 1
                },
                {
                    "product_id": giveRandomItemId(),
                    "quantity": 1
                },
                {
                    "product_id": giveRandomItemId(),
                    "quantity": 1
                }
            ]
        };
        await productService.makeOrder(payload, 201);
    });
    //You are able to send out an empty array of items and create an empty order,
    //which shouldn't be the case
    test.fail('Make an order with empty array of items', async ({ request }) => {
        const productService = new ProductService(request);
        const payload = {
            "items": []
        };
        await productService.makeOrder(payload, 400);
    });

});

test.describe('Admin panel tests', () => {

    test('Open admin product menu', async ({ request }) => {
        const userMenuService = new UserMenuService(request);
        await userMenuService.openMenu(urls.adminProductURL, 200);
    });

    test('Open admin warehouse menu', async ({ request }) => {
        const userMenuService = new UserMenuService(request);
        await userMenuService.openMenu(urls.adminWarehouseURL, 200);
    });

    test('Open admin order menu', async ({ request }) => {
        const userMenuService = new UserMenuService(request);
        await userMenuService.openMenu(urls.adminOrderURL, 200);
    });

    test('Create and delete product', async ({ request }) => {
        const createdProduct = await createData(request, urls.adminProductURL, testConfigProducts.testProduct, 201);
        const createdProductJson = await createdProduct.json();
        await deleteData(request, urls.adminProductURL, createdProductJson.id, 200);
    });

    test('Update product', async ({ request }) => {
        const randomProductId = giveRandomItemId();
        const getRandomProduct = await readData(request, urls.adminProductURL, randomProductId, 200);
        const randomProductJson = await getRandomProduct.json();
        delete randomProductJson.id;
        //The system sends out product data in all strings but only accepts price as number
        const payload = {
            ...randomProductJson,
            price: Number(randomProductJson.price)
        };
        await updateData(request, urls.adminProductURL, randomProductId, payload, 200);

    });


});

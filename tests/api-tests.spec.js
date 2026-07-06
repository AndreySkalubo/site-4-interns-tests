import { test } from "@playwright/test";
import { testConfigCredentials } from "../src/config/test-config-credentials";
import { postData } from "../src/api/login-function";
import { loginURL, registrationURL } from "../src/config/test-config-urls";
import { faker } from "@faker-js/faker";
import { createValidRegistrationData } from "../src/helpers/credentials-payload";
import { ProductService } from "../src/api/product-service";
import { testConfigProducts } from "../src/config/test-config-products";
import { giveRandomItemId } from "../src/helpers/give-random-item-id";

test.describe('Authentication tests', () => {

    test('Login test admin', async ({ request }) => {
        //201 Created
        await postData(request, loginURL, testConfigCredentials.admin, 201);
    });

    test('Login test user1', async ({ request }) => {
        //201 Created
        await postData(request, loginURL, testConfigCredentials.user1, 201);
    });

    test('Login test bad email', async ({ request }) => {
        //400 Bad Request
        await postData(request, loginURL, testConfigCredentials.user1BadData, 400);
    });

    test('Login test non-existent email', async ({ request }) => {
        //401 Unauthorized
        await postData(request, loginURL, testConfigCredentials.nonExistentData, 401);
    });

    test('Login test empty password', async ({ request }) => {
        //400 Bad Request
        await postData(request, loginURL, testConfigCredentials.emptyPassword, 400);
    });

    test('Login test empty email', async ({ request }) => {
        //400 Bad Request
        await postData(request, loginURL, testConfigCredentials.emptyEmail, 400);
    });

    test('Login test empty email and password', async ({ request }) => {
        //400 Bad Request
        await postData(request, loginURL, testConfigCredentials.emptyLoginData, 400);
    });

    test('SQL injection #1', async ({ request }) => {
        //400 Bad Request
        await postData(request, loginURL, testConfigCredentials.sqlInjection, 400);
    });
    test('SQL injection #2', async ({ request }) => {
        //400 Bad Request
        await postData(request, loginURL, testConfigCredentials.sqlInjection, 400);
    });
});

test.describe('Registration tests', () => {

    test('Registration test', async ({ request }) => {
        await postData(request, registrationURL, createValidRegistrationData(), 201);
    });

    test('Registration test temp mail', async ({ request }) => {
        await postData(
            request,
            registrationURL,
            {
                ...createValidRegistrationData(),
                email: faker.internet.email({ provider: 'gmeenramy.com' })
            },
            201
        );
    });

    test('Registration test incorrect phone number format', async ({ request }) => {
        await postData(
            request,
            registrationURL,
            {
                ...createValidRegistrationData(),
                phoneNumber: faker.phone.number()
            },
            400
        );
    });

    test('Registration test incorrect email', async ({ request }) => {
        await postData(
            request,
            registrationURL,
            {
                ...createValidRegistrationData(),
                email: faker.internet.email({ provider: null })
            },
            400
        );
    });

    test('Registration test empty first name', async ({ request }) => {
        await postData(
            request,
            registrationURL,
            {
                ...createValidRegistrationData(),
                firstname: null
            },
            400
        );
    });

    test('Registration test empty last name', async ({ request }) => {
        await postData(
            request,
            registrationURL,
            {
                ...createValidRegistrationData(),
                lastname: null
            },
            400
        );
    });

    test('Registration test empty email', async ({ request }) => {
        await postData(
            request,
            registrationURL,
            {
                ...createValidRegistrationData(),
                email: null
            },
            400
        );
    });

    test('Registration test empty username', async ({ request }) => {
        await postData(
            request,
            registrationURL,
            {
                ...createValidRegistrationData(),
                username: null
            },
            400
        );
    });

    test('Registration test empty phone number', async ({ request }) => {
        await postData(
            request,
            registrationURL,
            {
                ...createValidRegistrationData(),
                phoneNumber: null
            },
            400
        );
    });

    test('Registration test empty password', async ({ request }) => {
        await postData(
            request,
            registrationURL,
            {
                ...createValidRegistrationData(),
                password: null
            },
            400
        );
    });

    test('Registration test empty role', async ({ request }) => {
        await postData(
            request,
            registrationURL,
            {
                ...createValidRegistrationData(),
                role: null
            },
            400
        );
    });

    test('Registration test existing mail', async ({ request }) => {
        await postData(
            request,
            registrationURL,
            {
                ...createValidRegistrationData(),
                email: testConfigCredentials.existingUser.email
            },
            409
        );
    });
    //The system allows creating a user with existing username
    test('Registration test existing username', async ({ request }) => {
        await postData(
            request,
            registrationURL,
            {
                ...createValidRegistrationData(),
                email: testConfigCredentials.existingUser.username
            },
            400
        );
    });
    //The system allows creating a user with existing phone number
    test('Registration test existing phone number', async ({ request }) => {
        await postData(
            request,
            registrationURL,
            {
                ...createValidRegistrationData(),
                email: testConfigCredentials.existingUser.phoneNumber
            },
            400
        );
    });
});

test.describe('Product tests', () => {

    // test.beforeEach(async ({ request }) => {
    //     await postData(request, loginURL, testConfigCredentials.user1, 201);
    // });

    test('Add and delete product', async ({ request }) => {
        const productService = new ProductService(request);
        const randomItem = giveRandomItemId();
        await productService.addProductToBucket(randomItem, 201);
        await setTimeout(async () => {
            await productService.removeProductFromBucket(randomItem, 200);
        }, 200);

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

});
import { test, expect } from "@playwright/test";
import { testConfigCredentials } from "../src/config/test-config-credentials";
import { createData, deleteData, readData, updateData } from "../src/api/crud-functions";
import { urls } from "../src/config/test-config-urls";
import { faker } from "@faker-js/faker";
import { createValidRegistrationData } from "../src/helpers/credentials-payload";
import { ProductService } from "../src/api/product-service";
import { testConfigProducts } from "../src/config/test-config-products";
import { giveRandomItemId } from "../src/helpers/give-random-item-id";
import { UserMenuService } from "../src/api/admin-service";
import { testConfigOrders } from "../src/config/test-config-orders";

test.describe('Authentication tests', () => {

    test('Login test admin', async ({ request }) => {
        //201 Created
        const response =
            await createData(request, urls.loginURL, testConfigCredentials.admin);
        expect(response.status).toBe(201);
        expect(response.ok).toBeTruthy();
        expect(response.body.email).toBe(testConfigCredentials.admin.email);
    });

    test('Login test user1', async ({ request }) => {
        //201 Created
        const response =
            await createData(request, urls.loginURL, testConfigCredentials.user1);
        expect(response.status).toBe(201);
        expect(response.ok).toBeTruthy();
        expect(response.body.email).toBe(testConfigCredentials.user1.email);
    });

    test('Login test bad email', async ({ request }) => {
        //400 Bad Request
        const response =
            await createData(request, urls.loginURL, testConfigCredentials.user1BadData);
        expect(response.status).toBe(400);
        expect(response.ok).toBeFalsy();
        expect(response.body.error).toBe('Bad Request');
        expect(response.body.message).toStrictEqual(["email must be an email"]);
    });

    test('Login test non-existent email', async ({ request }) => {
        //401 Unauthorized
        const response =
            await createData(request, urls.loginURL, testConfigCredentials.nonExistentData);
        expect(response.status).toBe(401);
        expect(response.ok).toBeFalsy();
        expect(response.body.error).toBe('Unauthorized');
        expect(response.body.message).toStrictEqual("'Invalid email or password");
    });

    test('Login test empty password', async ({ request }) => {
        //400 Bad Request
        const response =
            await createData(request, urls.loginURL, testConfigCredentials.emptyPassword);
        expect(response.status).toBe(400);
        expect(response.ok).toBeFalsy();
        expect(response.body.error).toBe('Bad Request');
        expect(response.body.message).toStrictEqual([
            "password should not be empty",
            "password must be a string"
        ]);
    });

    test('Login test empty email', async ({ request }) => {
        //400 Bad Request
        const response =
            await createData(request, urls.loginURL, testConfigCredentials.emptyEmail);
        expect(response.status).toBe(400);
        expect(response.ok).toBeFalsy();
        expect(response.body.error).toBe('Bad Request');
        expect(response.body.message).toStrictEqual(["email must be an email"]);
    });

    test('Login test empty email and password', async ({ request }) => {
        //400 Bad Request
        const response =
            await createData(request, urls.loginURL, testConfigCredentials.emptyLoginData);
        expect(response.status).toBe(400);
        expect(response.ok).toBeFalsy();
        expect(response.body.error).toBe('Bad Request');
        expect(response.body.message).toStrictEqual([
            "email must be an email",
            "password should not be empty",
            "password must be a string",
        ]);
    });

    test('SQL injection #1', async ({ request }) => {
        //400 Bad Request
        const response =
            await createData(request, urls.loginURL, testConfigCredentials.sqlInjection);
        expect(response.status).toBe(400);
        expect(response.ok).toBeFalsy();
        expect(response.body.error).toBe('Bad Request');
        expect(response.body.message).toStrictEqual([
            "email must be an email",
            "password should not be empty",
            "password must be a string",
        ]);
    });

    test('SQL injection #2', async ({ request }) => {
        //400 Bad Request
        const response =
            await createData(request, urls.loginURL, testConfigCredentials.sqlInjection2);
        expect(response.status).toBe(400);
        expect(response.ok).toBeFalsy();
        expect(response.body.error).toBe('Bad Request');
        expect(response.body.message).toStrictEqual(["email must be an email"]);
    });
});

test.describe('Registration tests', () => {

    test('Registration test', async ({ request }) => {
        const validRegData = createValidRegistrationData();
        const response = await createData(request, urls.registrationURL, validRegData);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.ok).toBeTruthy();
        //assert body to have validRegData properties without encrypted password
        const { password, ...regPasswordlessData } = validRegData;
        expect(response.body).toMatchObject(regPasswordlessData);

    });


    test('Registration test temp mail', async ({ request }) => {
        const validRegData = {
            ...createValidRegistrationData(),
            email: faker.internet.email({ provider: 'gmeenramy.com' })
        };

        const response = await createData(request, urls.registrationURL, validRegData);
        expect(response.status).toBe(201);
        const { password, ...regPasswordlessData } = validRegData;
        expect(response.body).toMatchObject(regPasswordlessData);
        expect(response.ok).toBeTruthy();


    });

    test('Registration test incorrect phone number format', async ({ request }) => {

        const response = await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                phoneNumber: faker.phone.number()
            }
        );
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Bad Request');
        expect(response.ok).toBeFalsy();
        expect(response.body.message).toStrictEqual(['phoneNumber must be in international format (starting with +)']);


    });

    test('Registration test incorrect email', async ({ request }) => {
        const response = await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                email: faker.internet.email({ provider: "" })
            }
        );
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Bad Request');
        expect(response.ok).toBeFalsy();
        expect(response.body.message).toStrictEqual(['email must be an email']);

    });

    test('Registration test empty first name', async ({ request }) => {
        const response = await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                firstname: null
            }
        );
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Bad Request');
        expect(response.ok).toBeFalsy();
        expect(response.body.message).toStrictEqual(['firstname should not be empty', 'firstname must be a string']);

    });

    test('Registration test empty last name', async ({ request }) => {
        const response = await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                lastname: null
            }
        );
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Bad Request');
        expect(response.ok).toBeFalsy();
        expect(response.body.message).toStrictEqual(['lastname should not be empty', 'lastname must be a string']);


    });

    test('Registration test empty email', async ({ request }) => {
        const response = await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                email: null
            }
        );
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Bad Request');
        expect(response.ok).toBeFalsy();
        expect(response.body.message).toStrictEqual(['email must be an email']);


    });

    test('Registration test empty username', async ({ request }) => {
        const response = await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                username: null
            }
        );
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Bad Request');
        expect(response.ok).toBeFalsy();
        expect(response.body.message).toStrictEqual(['username should not be empty', 'username must be a string']);

    });

    test('Registration test empty phone number', async ({ request }) => {
        const response = await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                phoneNumber: null
            }
        );
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Bad Request');
        expect(response.ok).toBeFalsy();
        expect(response.body.message).toStrictEqual(['phoneNumber should not be empty', 'phoneNumber must be a string', 'phoneNumber must be in international format (starting with +)']);

    });

    test('Registration test empty password', async ({ request }) => {
        const response = await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                password: null
            }
        );
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Bad Request');
        expect(response.ok).toBeFalsy();
        expect(response.body.message).toStrictEqual(['Password must be at least 8 characters long']);

    });

    test('Registration test empty role', async ({ request }) => {
        const response = await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                role: null
            }
        );
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Bad Request');
        expect(response.ok).toBeFalsy();
        expect(response.body.message).toStrictEqual([
            'role must be one of the following values: USER, ADMIN'
        ]);

    });

    test('Registration test existing mail', async ({ request }) => {
        const response = await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                email: testConfigCredentials.existingUser.email
            }
        );
        expect(response.status).toBe(409);
        expect(response.body.error).toBe('Conflict');
        expect(response.ok).toBeFalsy();
        expect(response.body.message).toBe('Email "user1@test.com" already exists.');

    });
    //The system throws 500 Internal Server Error when trying to create a user with existing username
    test('Registration test existing username', async ({ request }) => {
        const response = await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                username: testConfigCredentials.existingUser.username
            }
        );
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Internal server error');
        expect(response.ok).toBeFalsy();

    });
    //The system allows creating a user with existing phone number
    test.fail('Registration test existing phone number', async ({ request }) => {
        const response = await createData(
            request,
            urls.registrationURL,
            {
                ...createValidRegistrationData(),
                phoneNumber: testConfigCredentials.existingUser.phoneNumber
            }
        );
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Bad Request');
        expect(response.ok).toBeFalsy();

    });
});

test.describe('Product tests', () => {

    test.describe.configure({ mode: 'serial' });

    test('Add and delete product', async ({ request }) => {
        const productService = new ProductService(request);
        const randomItem = giveRandomItemId();
        const addResp = await productService.addProductToBucket(randomItem);
        expect(addResp.status).toBe(201);
        expect(addResp.ok).toBeTruthy();
        expect(addResp.body).toHaveProperty("product_id");

        const removeResp = await productService.removeProductFromBucket(randomItem);
        expect(removeResp.status).toBe(200);
        expect(removeResp.ok).toBeTruthy();
        expect(removeResp.body).toHaveProperty("product_id");

    });

    test('Get product', async ({ request }) => {
        const productService = new ProductService(request);
        const randomItem = giveRandomItemId();
        const resp = await productService.getProduct(randomItem);
        expect(resp.status).toBe(200);
        expect(resp.ok).toBeTruthy();
        expect(resp.body.id).toBe(randomItem);
    });

    test('Get non-existent product', async ({ request }) => {
        const productService = new ProductService(request);
        const randomItem = giveRandomItemId() - testConfigProducts.firstProductEntryID;
        const resp = await productService.getProduct(randomItem);
        expect(resp.status).toBe(404);
        expect(resp.ok).toBeFalsy();
        expect(resp.body.error).toBe('Not Found');
        expect(resp.body.message).toBe(`Product with ID ${randomItem} not found`);
    });

    test('Make an order', async ({ request }) => {
        const productService = new ProductService(request);
        const resp = await productService.makeOrder(testConfigOrders.testOrder);
        expect(resp.status).toBe(201);
        expect(resp.ok).toBeTruthy();
        expect(resp.body).toHaveProperty("orderId");
    });
    //You are able to send out an empty array of items and create an empty order,
    //which shouldn't be the case
    test.fail('Make an order with empty array of items', async ({ request }) => {
        const productService = new ProductService(request);
        const resp = await productService.makeOrder(testConfigOrders.testEmptyOrder);
        expect(resp.status).toBe(400);
        expect(resp.ok).toBeFalsy();
        expect(resp.body.error).toBe('Bad Request');
        expect(resp.body.message).toBe('Order items cannot be empty');
    });

});

test.describe('Admin panel tests', () => {

    test('Open admin product menu', async ({ request }) => {
        const userMenuService = new UserMenuService(request);
        const response = await userMenuService.openMenu(urls.adminProductURL);

        expect(response.status).toBe(200);
        expect(response.ok).toBeTruthy();
        expect(response.body instanceof Array).toBeTruthy();
    });

    test('Open admin warehouse menu', async ({ request }) => {
        const userMenuService = new UserMenuService(request);
        const response = await userMenuService.openMenu(urls.adminWarehouseURL);

        expect(response.status).toBe(200);
        expect(response.ok).toBeTruthy();
        expect(response.body instanceof Array).toBeTruthy();
    });

    test('Open admin order menu', async ({ request }) => {
        const userMenuService = new UserMenuService(request);
        const response = await userMenuService.openMenu(urls.adminOrderURL);

        expect(response.status).toBe(200);
        expect(response.ok).toBeTruthy();
        expect(response.body instanceof Array).toBeTruthy();

    });

    test('Create and delete product', async ({ request }) => {
        const createdResponse =
            await createData(request, urls.adminProductURL, testConfigProducts.testProduct);
        expect(createdResponse.status).toBe(201);
        expect(createdResponse.ok).toBeTruthy();
        expect(createdResponse.body).toHaveProperty("id");

        if (typeof createdResponse.body.id === "number") {
            const response = await deleteData(request, urls.adminProductURL, createdResponse.body.id);

            expect(response.status).toBe(200);
            expect(response.ok).toBeTruthy();
            expect(response.body).toStrictEqual(createdResponse.body);
        } else {
            throw new Error(`id is not a number`);
        }


    });

    test('Update product', async ({ request }) => {
        const randomProductId = giveRandomItemId();
        const getRandomProduct = await readData(request, urls.adminProductURL, randomProductId);
        expect(getRandomProduct.status).toBe(200);
        expect(getRandomProduct.ok).toBeTruthy();
        const { id, ...randomProductWithoutId } = getRandomProduct.body;
        //The system sends out product data in all strings but only accepts price as number
        const response = await updateData(request, urls.adminProductURL, randomProductId, {
            ...randomProductWithoutId,
            price: Number(randomProductWithoutId.price)
        });

        expect(response.status).toBe(200);
        expect(response.ok).toBeTruthy();
        expect(response.body).toStrictEqual(getRandomProduct.body);

    });

});
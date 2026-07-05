import { test } from "@playwright/test";
import { testConfigCredentials } from "../src/config/test-config-credentials";
import { login } from "../src/api/login-function";

test.describe('Autentication tests', () => {

    test('Login test admin', async ({ request }) => {
        //201 Created
        await login(request, testConfigCredentials.admin, 201);
    });

    test('Login test user1', async ({ request }) => {
        //201 Created
        await login(request, testConfigCredentials.user1, 201);
    });

    test('Login test bad email', async ({ request }) => {
        //400 Bad Request
        await login(request, testConfigCredentials.user1BadData, 400)
    });

    test('Login test non-existent email', async ({ request }) => {
        //401 Unauthorized
        await login(request, testConfigCredentials.nonExistentData, 401)
    });

    test('Login test empty password', async ({ request }) => {
        //400 Bad Request
        await login(request, testConfigCredentials.emptyPassword, 400)
    });

    test('Login test empty email', async ({ request }) => {
        //400 Bad Request
        await login(request, testConfigCredentials.emptyEmail, 400)
    });

    test('Login test empty email and password', async ({ request }) => {
        //400 Bad Request
        await login(request, testConfigCredentials.emptyLoginData, 400)
    });
});

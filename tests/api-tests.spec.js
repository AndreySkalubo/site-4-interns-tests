import { expect, test } from "@playwright/test";
import { LoginClient } from "../src/api/login-client";
import { testConfigCredentials } from "../src/config/test-config-credentials";

test('Login test admin', async ({ request }) => {
    const loginClient = new LoginClient(request);
    //Вынести в конфиг
    const response = await loginClient.postAuthentication(testConfigCredentials.admin);
    await expect(response.status()).toBe(201);
});

test('Login test user1', async ({ request }) => {
    const loginClient = new LoginClient(request);
    //Вынести в конфиг
    const response = await loginClient.postAuthentication(testConfigCredentials.user1);
    await expect(response.status()).toBe(201);
});
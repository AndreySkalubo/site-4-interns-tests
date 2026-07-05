import { expect } from "@playwright/test";
export async function login(request, payload, expectedStatus) {
    const response = await request.post('http://localhost:5173/api/auth/login', { data: payload });
    await expect(response.status()).toBe(expectedStatus);
}
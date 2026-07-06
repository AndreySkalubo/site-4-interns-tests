import { expect } from "@playwright/test";

export async function postData(request, url, payload, expectedStatus) {
    const response = await request.post(url, { data: payload });
    await expect(response.status()).toBe(expectedStatus);
}
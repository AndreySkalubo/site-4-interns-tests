import { expect } from "@playwright/test";

export class UserMenuService {
    constructor(request) {
        this.request = request;
    }
    async openMenu(url, expectedStatus) {
        const response = await this.request.get(url);
        await expect(response.status()).toBe(expectedStatus);
    }
}
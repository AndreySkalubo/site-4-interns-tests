import { APIRequestContext, expect } from "@playwright/test";

export class UserMenuService {
    readonly request: APIRequestContext
    constructor(request: APIRequestContext) {
        this.request = request;
    }
    async openMenu(url: string, expectedStatus: number) {
        const response = await this.request.get(url);
        expect(response.status()).toBe(expectedStatus);
    }
}
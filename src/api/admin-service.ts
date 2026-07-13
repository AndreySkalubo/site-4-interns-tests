import { APIRequestContext, expect } from "@playwright/test";

export class UserMenuService {
    request: APIRequestContext
    constructor(request: APIRequestContext) {
        this.request = request;
    }
    //remove expect
    async openMenu(url: string, expectedStatus: number) {
        const response = await this.request.get(url);
        expect(response.status()).toBe(expectedStatus);
    }
}
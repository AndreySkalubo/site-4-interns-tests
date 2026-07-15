import { APIRequestContext, expect } from "@playwright/test";

export class UserMenuService {
    readonly request: APIRequestContext;
    constructor(request: APIRequestContext) {
        this.request = request;
    }
    async openMenu(url: string) {
        const response = await this.request.get(url);
        return response;
    }
}
import { Locator, Page } from "@playwright/test";

export class ProfilePage {
    readonly page: Page;
    readonly profileHeading: Locator;
    constructor(page: Page) {
        this.page = page;
        this.profileHeading = page.getByRole('heading', { name: 'Мой Профиль' });
    }
}
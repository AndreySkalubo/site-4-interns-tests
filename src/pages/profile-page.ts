import { Locator, Page } from "@playwright/test";

export class ProfilePage {
    page: Page;
    profileHeading: Locator;
    constructor(page: Page) {
        this.page = page;
        this.profileHeading = page.getByRole('heading', { name: 'Мой Профиль' });
    }
}
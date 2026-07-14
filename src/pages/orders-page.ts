import { Locator, Page } from "@playwright/test";

export class OrdersPage {
    readonly page: Page;
    readonly ordersHeading: Locator;
    constructor(page: Page) {
        this.page = page;
        this.ordersHeading = page.getByRole('heading', { name: 'Мои Заказы' });
    }
}
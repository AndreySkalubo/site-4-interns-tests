import { Locator, Page } from "@playwright/test";

export class OrdersPage {
    page: Page;
    ordersHeading: Locator;
    constructor(page: Page) {
        this.page = page;
        this.ordersHeading = page.getByRole('heading', { name: 'Мои Заказы' });
    }
}
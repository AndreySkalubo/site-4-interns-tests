import { Page } from "@playwright/test";

export class ProductPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    isProductPageOpened() {
        return this.page.getByRole('heading', { name: 'Описание' }).isVisible();
    }
    addToCart() {
        return this.page.getByRole('button', { name: 'Добавить в корзину' }).click();
    }
}
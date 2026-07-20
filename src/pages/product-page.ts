import { Page } from "@playwright/test";

export class ProductPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async isProductPageOpened() {
        return this.page.getByRole('heading', { name: 'Описание' }).isVisible();
    }
    async addToCart() {
        await this.page.getByRole('button', { name: 'Добавить в корзину' }).click();
        return this.page.getByRole('heading').first().innerText();
    }
}
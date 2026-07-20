import { expect, Locator, Page } from "@playwright/test";

export class ProductPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly productHeading: Locator;
    readonly description: Locator;
    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = this.page.getByRole('button', { name: 'Добавить в корзину' });
        this.productHeading = this.page.getByRole('heading').first();
        this.description = this.page.getByRole('heading', { name: 'Описание' });
    }
    async isProductPageOpened() {
        return this.description.isVisible();
    }
    async addToCart() {
        await this.addToCartButton.click();
        return this.productHeading.innerText();
    }
}
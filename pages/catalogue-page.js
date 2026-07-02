import { expect } from '@playwright/test';

export class CataloguePage {
    constructor(page) {
        this.page = page;
        this.returnButton = page.getByRole('link', { name: 'Shop System' });
    }

    async addProductsToCart(number) {
        const addButtons = await this.page.getByRole('button', {
            name: 'В корзину', type: 'button', exact: true
        });
        for (let i = 0; i < number; i++) {
            await addButtons.nth(i).click();
        }
    }

    async gotoCartPage() {
        await this.page.getByRole('link', { name: 'Корзина' }).click();
    }

    async openRandomProduct() {
        const products = await this.page.getByRole('link', { name: 'В корзину' });
        const randomIndex = Math.floor(Math.random() * await products.count());
        await products.nth(randomIndex).click();
    }
}
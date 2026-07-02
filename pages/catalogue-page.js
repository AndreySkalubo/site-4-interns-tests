import { expect, Locator, Page } from '@playwright/test';
import {faker} from "@faker-js/faker";

export class CataloguePage {
    constructor(page) {
        this.page = page;
        this.returnButton = page.getByRole('link', { name: 'Shop System' });
    }

    async openCataloguePage() {
        await this.page.goto('http://localhost:5173/');
        await this.page.waitForURL('http://localhost:5173/');
        await expect(this.page).toHaveURL('http://localhost:5173/');
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
        const products = await this.page.getByRole('link', { name: 'Товар' });
        const randomIndex = Math.floor(Math.random() * await products.count());
        await products.nth(randomIndex).click();
    }
}
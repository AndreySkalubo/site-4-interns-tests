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

    async addRandomProductsToCart(number) {
        const addButtons = await this.page.getByRole('button', { name: 'В корзину', type: 'button' });
        for (let i = 0; i < number; i++) {
            await addButtons.nth(faker.number.int({ min: 0, max: addButtons.length - 1 })).click();
        }
    }
}
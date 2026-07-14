import { expect, Locator, Page } from '@playwright/test';

export class CataloguePage {
    readonly page: Page;
    readonly catalogueHeading: Locator;
    constructor(page: Page) {
        this.page = page;
        this.catalogueHeading = page.getByRole('heading', { name: 'Каталог товаров' });
    }

    async addProductsToCart(number: number) {
        const addButtons = this.page.getByRole('button', {
            name: 'В корзину', exact: true
        });
        for (let i = 0; i < number; i++) {
            await addButtons.nth(i).click();
        }
    }

    async openRandomProduct() {
        const products = this.page.getByRole('link', { name: 'В корзину' });
        const randomIndex = Math.floor(Math.random() * await products.count());
        await products.nth(randomIndex).click();
    }

    async validateImageLinks() {
        await this.page.waitForLoadState('networkidle');
        const imageLinks = this.page.getByRole('img');
        console.log(`Found ${await imageLinks.count()} image links on the page.`);
        for (let i = 0; i < await imageLinks.count(); i++) {
            const imageUrl = await imageLinks.nth(i).getAttribute('src');
            const imageResponse = await this.page.request.get(String(imageUrl));
            expect(imageResponse.ok()).toBeTruthy();
        }
    }

}
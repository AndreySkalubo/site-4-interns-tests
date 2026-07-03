import { expect } from '@playwright/test';

export class CataloguePage {
    constructor(page) {
        this.page = page;
        this.catalogueHeading = page.getByRole('heading', { name: 'Каталог товаров' });
    }

    async addProductsToCart(number) {
        const addButtons = await this.page.getByRole('button', {
            name: 'В корзину', type: 'button', exact: true
        });
        for (let i = 0; i < number; i++) {
            await addButtons.nth(i).click();
        }
    }

    async openRandomProduct() {
        const products = await this.page.getByRole('link', { name: 'В корзину' });
        const randomIndex = Math.floor(Math.random() * await products.count());
        await products.nth(randomIndex).click();
    }

    async validateImageLinks() {
        await this.page.waitForLoadState('networkidle');
        const imageLinks = await this.page.getByRole('img');
        console.log(`Found ${await imageLinks.count()} image links on the page.`);
        for (let i = 0; i < await imageLinks.count(); i++) {
            const imageUrl = await imageLinks.nth(i).getAttribute('src');
            const imageResponse = await this.page.request.get(imageUrl);
            expect(imageResponse.ok()).toBeTruthy();
        }
    }
    async validateProduct(productName) {
        await expect(this.page.getByText(productName, { exact: true }).last()).toBeVisible();
    }
}
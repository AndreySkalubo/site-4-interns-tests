import { expect, Locator, Page } from '@playwright/test';

export class CataloguePage {
    readonly page: Page;
    readonly catalogueHeading: Locator;
    constructor(page: Page) {
        this.page = page;
        this.catalogueHeading = page.getByRole('heading', { name: 'Каталог товаров' });
    }

    async addRandProductToCart() {
        const addButtons = this.page.getByRole('button', {
            name: 'В корзину', exact: true
        });
        const productNames = this.page.locator('.font-semibold.leading-none.tracking-tight.line-clamp-1.group-hover\\:text-primary.transition-colors');
        const randomProductNumber = Math.floor(Math.random() * await addButtons.count());
        await addButtons.nth(randomProductNumber).click();
        console.log(await productNames.count());
        return productNames.nth(randomProductNumber).innerText();
    }

    async openRandomProduct() {
        const products = this.page.getByRole('link', { name: 'В корзину' });
        const product = products.nth(Math.floor(Math.random() * await products.count()));
        await product.click();
        return product;
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
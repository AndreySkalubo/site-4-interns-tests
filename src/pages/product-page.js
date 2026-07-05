export class ProductPage {
    constructor(page) {
        this.page = page;
    }
    isProductPageOpened() {
        return this.page.getByRole('heading', { name: 'Описание' }).isVisible();
    }
    addToCart() {
        return this.page.getByRole('button', { name: 'Добавить в корзину' }).click();
    }
}
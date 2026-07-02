export class ProductPage {
    constructor(page) {
        this.page = page;
    }
    verifyProductPageOpened() {
        return this.page.getByRole('heading', { name: 'Товар' }).isVisible();
    }
}
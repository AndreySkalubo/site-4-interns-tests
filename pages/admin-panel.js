export class AdminPanel {
    constructor(page) {
        this.page = page;
        this.returnBackButton = page.getByRole('link', { name: 'Админ-панель' });
        this.productMenuButton = page.getByRole('link', { name: 'Товары' });
        this.addProductButton = page.getByRole('button', { name: 'Создать товар' });
        this.productSaveButton = page.getByRole('button', { name: 'Сохранить' });
        // this.productNameInput = page.getByLabel('Название товара');
        // this.productDescriptionInput = page.getByLabel('Описание товара');
        // this.productPriceInput = page.getByLabel('Цена товара');
        // this.productImageInput = page.getByLabel('Изображение товара');
        // this.submitButton = page.getByRole('button', { name: 'Добавить' });
    }
    async returnToCatalogue() {
        await this.returnBackButton.click();
    }
    async goToProductMenu() {
        await this.productMenuButton.click();
    }
    async clickAddProductButton() {
        await this.addProductButton.click();
    }
    async clickProductSaveButton() {
        await this.productSaveButton.click();
    }
    async fillProductForm(name, description, price, imagePath) {
        await this.page.getByLabel('Название').fill(name);
        await this.page.getByLabel('Описание').fill(description);
        await this.page.getByLabel('Цена (руб.)').fill(price);
        await this.page.getByLabel('URL Изображения').fill(imagePath);
    }
}
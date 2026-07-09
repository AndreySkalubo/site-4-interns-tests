export class AdminPanel {
    constructor(page) {
        this.page = page;
        this.returnBackButton = page.getByRole('link', { name: 'Админ-панель' });
        this.productMenuButton = page.getByRole('link', { name: 'Товары' });
        this.warehouseMenuButton = page.getByRole('link', { name: 'Склады' });
        this.addProductButton = page.getByRole('button', { name: 'Создать товар' });
        this.saveButton = page.getByRole('button', { name: 'Сохранить' });
        this.addWarehouseButton = page.getByRole('button', { name: 'Создать склад' });
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
    async clickSaveButton() {
        await this.saveButton.click();
    }
    async goToWarehouseMenu() {
        await this.warehouseMenuButton.click();
    }
    async clickAddWarehouseButton() {
        await this.addWarehouseButton.click();
    }
    async clickEditLastProductButton() {
        const editButtons = await this.page.getByRole('button', { name: 'Редакт.' }).last();
        const lastEditButton = editButtons.last();
        await lastEditButton.click();
    }
    async clickProductDeleteButton() {
        const deleteButtons = await this.page.getByRole('button', { name: 'Удалить' });
        const lastDeleteButton = deleteButtons.last();
        await lastDeleteButton.click();
    }
    async fillProductForm({ name, description, price, urlImage }) {
        await this.page.getByLabel('Название').fill(name);
        await this.page.getByLabel('Описание').fill(description);
        await this.page.getByLabel('Цена (руб.)').fill(String(price));
        await this.page.getByLabel('URL Изображения').fill(urlImage);
    }
    async fillWarehouseForm({ name, address }) {
        await this.page.getByLabel('Название').fill(name);
        await this.page.getByLabel('Адрес').fill(address);
    }
}
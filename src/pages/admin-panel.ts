import { Locator, Page } from "@playwright/test";

export class AdminPanel {
    readonly page: Page;
    readonly returnBackButton: Locator;
    readonly productMenuButton: Locator;
    readonly warehouseMenuButton: Locator;
    readonly addProductButton: Locator;
    readonly saveButton: Locator;
    readonly addWarehouseButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.returnBackButton = page.getByRole('link', { name: 'Админ-панель' });
        this.productMenuButton = page.getByRole('link', { name: 'Товары' });
        this.warehouseMenuButton = page.getByRole('link', { name: 'Склады' });
        this.addProductButton = page.getByRole('button', { name: 'Создать товар' });
        this.saveButton = page.getByRole('button', { name: 'Сохранить' });
        this.addWarehouseButton = page.getByRole('button', { name: 'Создать склад' });
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
        const editButtons = this.page.getByRole('button', { name: 'Редакт.' }).last();
        const lastEditButton = editButtons.last();
        await lastEditButton.click();
    }
    async clickProductDeleteButton(deletableName: string) {
        if (typeof deletableName === "string") {
            await this.page.getByRole('row').filter({
                has: this.page.getByRole('cell', { name: deletableName })
            }).getByRole('button', { name: 'Удалить' }).click();
        } else {
            await this.page.getByRole('button', { name: 'Удалить' }).last().click();
        }
    }
    async fillProductForm({ name, description, price, urlImage }: { name: string, description: string, price: number, urlImage: string; }) {
        await this.page.getByLabel('Название').fill(name);
        await this.page.getByLabel('Описание').fill(description);
        await this.page.getByLabel('Цена (руб.)').fill(String(price));
        await this.page.getByLabel('URL Изображения').fill(urlImage);
    }
    async fillWarehouseForm({ name, address }: { name: string; address: string; }) {
        await this.page.getByLabel('Название').fill(name);
        await this.page.getByLabel('Адрес').fill(address);
    }
}
import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly makeOrderButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.makeOrderButton = page.getByRole('button', { name: 'Оформить заказ' });
    }

    async verifyCartItem(string: string) {
        await expect(this.page.getByText(string)).toBeVisible();
    }
    async removeAllItemsFromCart() {
        const removeButtons = this.page.getByRole('button', { name: 'Удалить' });
        const count = await removeButtons.count();
        for (let i = 0; i < count; i++) {
            await removeButtons.nth(i).click();
        }
    }
    async makeOrder() {
        await this.makeOrderButton.click();
    }
    async isCartEmpty() {
        const emptyCartMessage = this.page.getByText('Ваша корзина пуста.');
        return await emptyCartMessage.isVisible();
    }
}
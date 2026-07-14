import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly makeOrderButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.makeOrderButton = page.getByRole('button', { name: 'Оформить заказ' });
    }

    async verifyCartItemsCount(number: number) {
        const cartItems = this.page.getByRole('button', { name: 'Удалить' });
        await expect(cartItems).toHaveCount(number);
    }
    async removeAllItemsFromCart() {
        const removeButtons = this.page.getByRole('button', { name: 'Удалить' });
        const count = await removeButtons.count();
        for (let i = 0; i < count; i++) {
            await removeButtons.first().click();
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
import { expect } from '@playwright/test';

export class CartPage {
    constructor(page) {
        this.page = page;
        this.makeOrderButton = page.getByRole('button', { name: 'Оформить заказ' });
    }

    async verifyCartItemsCount(number) {
        const cartItems = await this.page.getByRole('button', { name: 'Удалить' });
        await expect(cartItems).toHaveCount(number);
    }
    async removeAllItemsFromCart() {
        const removeButtons = await this.page.getByRole('button', { name: 'Удалить' });
        const count = await removeButtons.count();
        for (let i = 0; i < count; i++) {
            await removeButtons.first().click();
        }
    }
    async makeOrder() {
        await this.makeOrderButton.click();
    }
    async isCartEmpty() {
        const emptyCartMessage = await this.page.getByText('Ваша корзина пуста.');
        return await emptyCartMessage.isVisible();
    }
}
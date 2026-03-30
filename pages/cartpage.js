import { expect, Locator, Page } from '@playwright/test'

export class CartPage {
    constructor(page) {
        this.page = page
        this.cartItems = page.locator('#cart_contents_container > div > div.cart_list')
        this.checkoutButton = page.locator('#checkout')
        this.continueShoppingButton = page.locator('#continue-shopping')
    }
    async goToCheckout() {
        await this.checkoutButton.click()
    }
    async getItem() {
        return await this.cartItems.locator('.inventory_item_name').first().innerText()
    }
}
module.exports = CartPage
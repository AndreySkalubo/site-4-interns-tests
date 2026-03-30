import { expect, Locator, Page } from '@playwright/test'

export class InventoryPage {
    constructor(page) {
        this.page = page
        this.pageTitle = page.locator('#header_container > div.header_secondary_container > span')
        this.inventoryItems = page.locator('#inventory_container > div')
        this.productSortContainer = page.locator('#header_container > div.header_secondary_container > div > span > select')
        this.shoppingCartButton = page.locator('#shopping_cart_container > .shopping_cart_link')
        this.merchList = page.locator('#inventory_container > div')
    }

    async sortByPriceHighToLow() {
        await this.productSortContainer.selectOption('hilo')
    }
    async addFirstItemToCart() {
        await this.inventoryItems.locator('button').first().click()
    }
    async openCart() {
        await this.shoppingCartButton.click()
    }
    getPageTitle() {
        return this.pageTitle
    }
    
    async getFirstItemName() {
        return await this.inventoryItems.locator('.inventory_item_name').first().innerText()
    }
}

module.exports = InventoryPage
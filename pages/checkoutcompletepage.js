import { expect, Locator, Page } from '@playwright/test'

export class CheckoutCompletePage {
    constructor(page) {
        this.page = page
        this.completeMessage = page.locator('#checkout_complete_container > h2')
        this.backHomeButton = page.locator('#back-to-products')
    }
    getCompletionMessage() {
        return this.completeMessage
    }
    async pressBackHomeButton() {
        await this.backHomeButton.click()
    }
}
module.exports = CheckoutCompletePage
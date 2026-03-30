import { expect, Locator, Page } from '@playwright/test'

export class CheckoutStepTwoPage {
    constructor(page) {
        this.page = page
        this.summaryInfo = page.locator('#checkout_summary_container > div > div.summary_info')
        this.total = page.locator('#checkout_summary_container > div > div.summary_info > div.summary_total_label')
        this.finishCheckoutButton = page.locator('#finish')
    }
    async finishCheckout() {
        await this.finishCheckoutButton.click()
    }
}
module.exports = CheckoutStepTwoPage
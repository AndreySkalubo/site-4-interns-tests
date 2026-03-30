import { test, expect } from '@playwright/test'
const LoginPage = require('../pages/loginpage')
const InventoryPage = require('../pages/inventorypage')
const CartPage = require('../pages/cartpage')
const CheckoutStepOnePage = require('../pages/checkoutseponepage')
const CheckoutStepTwoPage = require('../pages/checkoutseptwopage')
const CheckoutCompletePage = require('../pages/checkoutcompletepage')

test('purchase flow', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const inventoryPage = new InventoryPage(page)
    const cartPage = new CartPage(page)
    const stepOne = new CheckoutStepOnePage(page)
    const stepTwo = new CheckoutStepTwoPage(page)
    const completePage = new CheckoutCompletePage(page)

    await loginPage.open()
    await loginPage.login('standard_user', 'secret_sauce')

    await expect(inventoryPage.getPageTitle()).toHaveText('Products')

    await inventoryPage.sortByPriceHighToLow()
    const addedItemName = await inventoryPage.getFirstItemName()
    await inventoryPage.addFirstItemToCart()

    await inventoryPage.openCart()
    const itemInCartName = await cartPage.getItem()
    await expect(itemInCartName).toBe(addedItemName)

    await cartPage.goToCheckout()

    await stepOne.fillUserInfo('Jon', 'Snow', '212000')

    await stepTwo.finishCheckout()

    await expect(completePage.getCompletionMessage()).toHaveText('Thank you for your order!')
    await completePage.pressBackHomeButton()
})
import { expect, Locator, Page } from '@playwright/test'

export class LoginPage {
    constructor(page) {
        this.page = page
        this.username = page.getByRole('textbox', { name: 'Username' })
        this.password = page.getByRole('textbox', { name: 'Password' })
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.errorBox = page.locator('div.error-message-container')
    }
    async open() {
        await this.page.goto('https://www.saucedemo.com/')
    }
    async login(username, password) {
        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginButton.click()
        await expect(this.errorBox).toBeHidden()
    }
}

module.exports = LoginPage
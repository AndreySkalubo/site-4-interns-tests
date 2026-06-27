import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page.js';
// import { LoginPage } from '../pages/login-page.js';

test('flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login("admin@test.com", "admin123");
    
});
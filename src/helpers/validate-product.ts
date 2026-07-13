import { expect, Page } from '@playwright/test';

export async function validateProduct(productName: string, page: Page) {
    await expect(page.getByText(productName, { exact: true }).last()).toBeVisible();
}

export async function validateProductDeleted(productName: string, page: Page) {
    await expect(page.getByText(productName, { exact: true }).last()).not.toBeVisible();
}
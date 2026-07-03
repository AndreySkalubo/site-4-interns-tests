import { expect } from '@playwright/test';

export async function validateProduct(productName, page) {
    await expect(page.getByText(productName, { exact: true }).last()).toBeVisible();
}

export async function validateProductDeleted(productName, page) {
    await expect(page.getByText(productName, { exact: true }).last()).not.toBeVisible();
}
import { expect, Locator, Page } from '@playwright/test';

export class CataloguePage {
    constructor(page) {
        this.page = page;
        this.returnButton = page.getByRole('link', { name: 'Shop System' });
    }
}
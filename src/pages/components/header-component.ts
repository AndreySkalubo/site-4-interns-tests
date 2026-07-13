import { Locator, Page } from "@playwright/test";

export class HeaderComponent {
    page: Page;
    returnButton: Locator;
    adminPanelButton: Locator;
    ordersButton: Locator;
    cartButton: Locator;
    profileDropdown: Locator;
    profileButton: Locator;
    orderHistoryButton: Locator;
    exitButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.returnButton = page.getByRole('link', { name: 'Shop System' });
        this.adminPanelButton = page.getByRole('link', { name: 'Панель' });
        this.ordersButton = page.getByRole('link', { name: 'Заказы' });
        this.cartButton = page.getByRole('link', { name: 'Корзина' });
        this.profileDropdown = page.getByRole('button').and(page.locator('[aria-haspopup="menu"]'));
        //Next 3 only visible when popup pressed
        this.profileButton = page.getByRole('menuitem', { name: 'Профиль' });
        this.orderHistoryButton = page.getByRole('menuitem', { name: 'История заказов' });
        this.exitButton = page.getByRole('menuitem', { name: 'Выйти' });
    }
    async returnToCatalogue() {
        await this.returnButton.click();
    }
    async goToAdminPanel() {
        await this.adminPanelButton.click();
    }
    async goToOrdersPage() {
        await this.ordersButton.click();
    }
    async goToCartPage() {
        await this.cartButton.click();
    }
    async openProfileDropdown() {
        await this.profileDropdown.click();
    }
    async goToProfilePage() {
        await this.profileButton.click();
    }
    async goToOrderHistoryPage() {
        await this.orderHistoryButton.click();
    }   
    async exitProfile() {
        await this.exitButton.click();
    }
}
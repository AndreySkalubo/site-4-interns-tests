export class HeaderComponent {
    constructor(page) {
        this.page = page;
        this.returnButton = page.getByRole('link', { name: 'Shop System' });
        this.adminPanelButton = page.getByRole('link', { name: 'Панель' });
        this.ordersButton = page.getByRole('link', { name: 'Заказы' });
        this.cartButton = page.getByRole('link', { name: 'Корзина' });
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
}
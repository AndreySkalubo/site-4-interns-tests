export class OrdersPage {
    constructor(page) {
        this.page = page;
        this.ordersHeading = page.getByRole('heading', { name: 'Мои Заказы' });
    }
}
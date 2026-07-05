export class ProfilePage {
    constructor(page) {
        this.page = page;
        this.profileHeading = page.getByRole('heading', { name: 'Мой Профиль' });
    }
}
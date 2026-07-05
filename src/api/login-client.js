export class LoginClient {
    constructor(request) {
        this.request = request;
    }

    async postAuthentication(payload) {
        //Добавить в конфиг
        return await this.request.post('http://localhost:5173/api/auth/login', { data: payload });;
    }
}
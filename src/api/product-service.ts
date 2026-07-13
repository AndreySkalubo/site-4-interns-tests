import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { urls } from "../config/test-config-urls";

export class ProductService {
    request: APIRequestContext;
    constructor(request: APIRequestContext) {
        this.request = request;
    }
    async addProductToBucket(id: number, expectedStatus: number) {
        const response: APIResponse = await this.request.post(urls.addProductToBucketURL, { data: { "productId": id } });
        expect(response.status()).toBe(expectedStatus);
    }
    async removeProductFromBucket(id: number, expectedStatus: number) {
        const response: APIResponse = await this.request.delete(urls.removeProductFromBucketURL, { data: { "productId": id } });
        expect(response.status()).toBe(expectedStatus);
    }
    async getProduct(id: number, expectedStatus: number) {
        const response: APIResponse = await this.request.get(`${urls.getProductURL}${id}`);
        expect(response.status()).toBe(expectedStatus);
    }
    async makeOrder(payload: object, expectedStatus: number) {
        const response: APIResponse = await this.request.post(urls.makeOrderURL, {
            data: payload
        });
        expect(response.status()).toBe(expectedStatus);
    }
}
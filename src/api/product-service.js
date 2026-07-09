import { expect } from "@playwright/test";
import { urls } from "../config/test-config-urls";

export class ProductService {
    constructor(request) {
        this.request = request;
    }
    async addProductToBucket(id, expectedStatus) {
        const response = await this.request.post(urls.addProductToBucketURL, { data: { "productId": id } });
        await expect(response.status()).toBe(expectedStatus);
    }
    async removeProductFromBucket(id, expectedStatus) {
        const response = await this.request.delete(urls.removeProductFromBucketURL, { data: { "productId": id } });
        await expect(response.status()).toBe(expectedStatus);
    }
    async getProduct(id, expectedStatus) {
        const response = await this.request.get(`${urls.getProductURL}${id}`);
        await expect(response.status()).toBe(expectedStatus);
    }
    async makeOrder(payload, expectedStatus) {
        const response = await this.request.post(urls.makeOrderURL, {
            data: payload
        });
        await expect(response.status()).toBe(expectedStatus);
    }
}
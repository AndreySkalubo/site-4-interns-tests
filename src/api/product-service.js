import { expect } from "@playwright/test";
import { addProductToBucketURL, getProductURL, makeOrderURL, removeProductFromBucketURL } from "../config/test-config-urls";

export class ProductService {
    constructor(request) {
        this.request = request;
    }
    async addProductToBucket(id, expectedStatus) {
        const response = await this.request.post(addProductToBucketURL, { data: { "productId": id } });
        await expect(response.status()).toBe(expectedStatus);
    }
    async removeProductFromBucket(id, expectedStatus) {
        const response = await this.request.delete(removeProductFromBucketURL, { data: { "productId": id } });
        await expect(response.status()).toBe(expectedStatus);
    }
    async getProduct(id, expectedStatus) {
        const response = await this.request.get(`${getProductURL}${id}`);
        await expect(response.status()).toBe(expectedStatus);
    }
    async makeOrder(payload, expectedStatus) {
        const response = await this.request.post(makeOrderURL, {
            data: payload
        });
        await expect(response.status()).toBe(expectedStatus);
    }
}
import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { urls } from "../config/test-config-urls";
type bucketProduct = {
    product_id: number,
    bucket_id: number,
    product: [Object];
};

export class ProductService {
    readonly request: APIRequestContext;
    constructor(request: APIRequestContext) {
        this.request = request;
    }
    async addProductToBucket(id: number, expectedStatus: number) {
        const response = await this.request.post(urls.addProductToBucketURL, { data: { "productId": id } });
        expect(response.status()).toBe(expectedStatus);
    }
    async removeProductFromBucket(id: number, expectedStatus: number) {
        const response = await this.request.delete(urls.removeProductFromBucketURL, { data: { "productId": id } });
        expect(response.status()).toBe(expectedStatus);
    }
    async getProduct(id: number, expectedStatus: number) {
        const response = await this.request.get(`${urls.getProductURL}${id}`);
        expect(response.status()).toBe(expectedStatus);
    }
    async makeOrder(payload: object, expectedStatus: number) {
        const response = await this.request.post(urls.makeOrderURL, {
            data: payload
        });
        expect(response.status()).toBe(expectedStatus);
    }
    async clearBucket() {
        const response = await this.request.get(urls.bucketURL);
        const responseJSON: { id: number, products: bucketProduct[]; } = await response.json();

        const productIDs: number[] = responseJSON.products.map((product: bucketProduct) => {
            return product.product_id;
        });

        for (const id of productIDs) {
            await this.request.delete(urls.removeProductFromBucketURL, { data: { "productId": id } });
        }
    }
}
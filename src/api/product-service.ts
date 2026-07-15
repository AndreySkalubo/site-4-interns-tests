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
    async addProductToBucket(id: number) {
        const response = await this.request.post(urls.addProductToBucketURL, { data: { "productId": id } });
        return response;
    }
    async removeProductFromBucket(id: number) {
        const response = await this.request.delete(urls.removeProductFromBucketURL, { data: { "productId": id } });
        return response;
    }
    async getProduct(id: number) {
        const response = await this.request.get(`${urls.getProductURL}${id}`);
        return response;
    }
    async makeOrder(payload: object) {
        const response = await this.request.post(urls.makeOrderURL, {
            data: payload
        });
        return response;
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
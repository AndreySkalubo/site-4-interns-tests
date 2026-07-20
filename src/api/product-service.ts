import { APIRequestContext } from "@playwright/test";
import { urls } from "../config/test-config-urls";
import { createData, updateData, readData, deleteData } from "./crud-functions";
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
        return {
            status: response.status(),
            ok: response.ok(),
            body: await response.json() as { [key: string]: unknown; }
        };
    }

    async removeProductFromBucket(id: number) {
        const response = await this.request.delete(urls.removeProductFromBucketURL, { data: { "productId": id } });
        return {
            status: response.status(),
            ok: response.ok(),
            body: await response.json() as { [key: string]: unknown; }
        };
    }

    async getProduct(id: number) {
        const response = await this.request.get(`${urls.getProductURL}${id}`);
        return {
            status: response.status(),
            ok: response.ok(),
            body: await response.json() as { [key: string]: unknown; }
        };
    }

    async makeOrder(payload: object) {
        const response = await this.request.post(urls.makeOrderURL, {
            data: payload
        });
        return {
            status: response.status(),
            ok: response.ok(),
            body: await response.json() as { [key: string]: unknown; }
        };
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
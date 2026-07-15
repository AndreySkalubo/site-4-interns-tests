import { APIRequestContext, APIResponse } from "@playwright/test";
import { ApiResponse } from "../config/test-config-types";

export async function createData<T>(request: APIRequestContext, url: string, payload: object) {
    const response = await request.post(url, { data: payload });
    return {
        status: response.status(),
        ok: response.ok(),
        body: await response.json() as T
    };
}

export async function deleteData<T>(request: APIRequestContext, url: string, id: number) {
    const response = await request.delete(`${url}/${id}`);
    return {
        status: response.status(),
        ok: response.ok(),
        body: await response.json() as T
    };
}

export async function updateData<T>(request: APIRequestContext, url: string, id: number, payload: object) {
    const response = await request.patch(`${url}/${id}`, { data: payload });
    return {
        status: response.status(),
        ok: response.ok(),
        body: await response.json() as T
    };
}
export async function readData<T>(request: APIRequestContext, url: string, id: number) {
    const response = await request.get(`${url}/${id}`);
    return {
        status: response.status(),
        ok: response.ok(),
        body: await response.json() as T
    };
}
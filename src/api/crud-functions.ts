import { APIRequestContext, APIResponse } from "@playwright/test";

export async function createData(request: APIRequestContext, url: string, payload: object) {
    const response = await request.post(url, { data: payload });
    return response;
}

export async function deleteData(request: APIRequestContext, url: string, id: number) {
    const response = await request.delete(`${url}/${id}`);
    return response;
}

export async function updateData(request: APIRequestContext, url: string, id: number, payload: object) {
    const response = await request.patch(`${url}/${id}`, { data: payload });
    return response;
}
export async function readData(request: APIRequestContext, url: string, id: number) {
    const response = await request.get(`${url}/${id}`);
    return response;
}
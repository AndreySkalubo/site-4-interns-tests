import { expect } from "@playwright/test";

export async function createData(request, url, payload, expectedStatus) {
    const response = await request.post(url, { data: payload });
    await expect(response.status()).toBe(expectedStatus);
    return response;
}

export async function deleteData(request, url, id, expectedStatus) {
    const response = await request.delete(`${url}/${id}`);
    await expect(response.status()).toBe(expectedStatus);
    return response;
}

export async function updateData(request, url, id, payload, expectedStatus) {
    const response = await request.patch(`${url}/${id}`, { data: payload });
    await expect(response.status()).toBe(expectedStatus);
    return response;
}
export async function readData(request, url, id, expectedStatus) {
    const response = await request.get(`${url}/${id}`);
    await expect(response.status()).toBe(expectedStatus);
    return response;
}
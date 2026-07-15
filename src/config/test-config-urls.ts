const baseURL = 'http://localhost:5173';
export const urls = {
    baseURL: baseURL,
    loginURL: `${baseURL}/api/auth/login`,
    registrationURL: `${baseURL}/api/auth/register`,
    webRegistrationURL:`${baseURL}/register`,
    addProductToBucketURL: `${baseURL}/api/bucket/1/addProduct`,
    removeProductFromBucketURL: `${baseURL}/api/bucket/1/removeProduct`,
    getProductURL: `${baseURL}/api/product/`,
    makeOrderURL: `${baseURL}/api/order/1`,
    adminProductURL: `${baseURL}/api/product`,
    adminWarehouseURL: `${baseURL}/api/warehouse`,
    adminOrderURL: `${baseURL}/api/order`,
    bucketURL: `${baseURL}/api/bucket/2`,
} as const;
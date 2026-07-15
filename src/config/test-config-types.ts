export type product = {
    id?: number,
    name: string,
    description: string,
    price: string,
    category: string,
    urlImage: string;
};
export type userAuthRespBody = {
    // id: number,
    firstname: string,
    lastname: string,
    phoneNumber: string,
    email: string,
    username: string,
    role: string,
    bucket_id: number;
};
export type userLoginErrorBody = {
    message: string[],
    error: string,
    statusCode: number;
};
export type ApiResponse<T> = {
    status: number;
    ok: boolean;
    body: T;
};
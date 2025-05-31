import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
} from "axios";

export const getItem = (key: string): string | null => {
    return localStorage.getItem(key);
};
export const api: AxiosInstance= axios.create({
    // eslint-disable-next-line no-undef
    baseURL: process.env.NEXT_PUBLIC_BASE_URL + "/api",
});



function errorHandler(error: AxiosError) {
    const { status } = error.response || {};

    throw {
        status,
        ...(error.response?.data || {
            message: error?.message || "Something went wrong",
        }),
    };
}

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    errorHandler
);
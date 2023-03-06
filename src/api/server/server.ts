import axios, { InternalAxiosRequestConfig } from "axios";

export const server = axios.create({
    baseURL: "https://wallet.oneecoin.site",
    withCredentials: true,
});

const addAccessToken = async (
    config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
    let token = localStorage.getItem("access");
    if (token !== null) {
        config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
};

const refreshAccessToken = async (err: any) => {
    const {
        config,
        response: { status },
    } = err;

    if (status !== 401 || config.sent) {
        return Promise.reject(err);
    }
    config.sent = true;
    try {
        const { data } = await axios.post("/auth/refresh");
        localStorage.setItem("access", data.access);
    } catch (e) {
        localStorage.removeItem("access");
    }

    return axios(config);
};

server.interceptors.request.use(addAccessToken);
server.interceptors.response.use((res) => res, refreshAccessToken);

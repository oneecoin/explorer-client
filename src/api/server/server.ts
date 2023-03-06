import axios, { InternalAxiosRequestConfig } from "axios";
import Cookie from "js-cookie";
import moment from "moment";

export const server = axios.create({
    baseURL: "https://wallet.oneecoin.site",
    withCredentials: true,
});

const refresh = async (
    config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
    let exp = localStorage.getItem("exp");
    let token = localStorage.getItem("accessToken");

    // 토큰이 만료되었고, refreshToken 이 저장되어 있을 때
    if (Number(exp) - moment().unix() <= 0) {
        // 토큰 갱신 서버통신
        const { data, status } = await server.post("/auth/refresh");
        if (status !== 400) {
            token = data.data.access;
            exp = data.data.exp;
            localStorage.setItem("accessToken", data.data.access);
            localStorage.setItem("exp", exp!);
        } else {
            localStorage.removeItem("exp");
            localStorage.removeItem("accessToken");
        }
    }

    if (token !== null) {
        config.headers!.Authorization = `Bearer ${token}`;
    }

    return config;
};

const refreshErrorHandle = (err: any) => {
    // Cookie.remove("refresh");
};

server.interceptors.request.use(refresh, refreshErrorHandle);

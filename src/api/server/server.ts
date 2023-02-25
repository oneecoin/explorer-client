import axios, { InternalAxiosRequestConfig } from "axios";
import Cookie from "js-cookie";
import moment from "moment";

export const server = axios.create({
    baseURL: "https://oneecoin-explorer-server.onrender.com",
    withCredentials: true,
});

const refresh = async (
    config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
    const refreshToken = Cookie.get("refresh");
    let exp = localStorage.getItem("exp");
    let token = localStorage.getItem("accessToken");

    // 토큰이 만료되었고, refreshToken 이 저장되어 있을 때
    if (moment.unix(Number(exp)).diff(moment().unix()) < 0 && refreshToken) {
        const body = {
            refreshToken,
        };

        // 토큰 갱신 서버통신
        const { data } = await server.post("/auth/refresh", body);

        token = data.data.access;
        exp = data.data.exp;
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("exp", exp!);
    }

    if (token !== null) {
        config.headers!.Authorization = `Bearer ${token}`;
    }

    return config;
};

const refreshErrorHandle = (err: any) => {
    Cookie.remove("refresh");
};

server.interceptors.request.use(refresh, refreshErrorHandle);

import { QueryFunctionContext } from "@tanstack/react-query";
import { server } from "./server";

export const getUser = async ({ queryKey }: QueryFunctionContext) => {
    const [_, pk] = queryKey;
    const data = await server.get(`/users/@${pk}`);
    return data.data;
};

export const getMe = async () => {
    const data = await server.get(`/users/me`);
    return data.data;
};

export const changeUsername = async (username: string) => {
    const data = await server.put("/users/me", {
        username,
    });
    return data.status;
};

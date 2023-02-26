import { QueryFunctionContext } from "@tanstack/react-query";
import { server } from "./server";

export const getUser = async ({ queryKey }: QueryFunctionContext) => {
    const [_, pk] = queryKey;
    const data = await server.get(`/users/@${pk}`);
    return data.data;
};

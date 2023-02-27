import { useQuery } from "@tanstack/react-query";
import { server } from "./server";
import { ITinyMe } from "./types";

async function getTinyMe() {
    const data = await server.get("/users/me/tiny");
    return data.data;
}

export const useTinyUser = () => {
    const { isLoading, data, isError } = useQuery<ITinyMe>(["tinyMe"], getTinyMe, {
        retry: false,
    });
    return {
        userLoading: isLoading,
        user: data,
        isLoggedIn: !isError,
    };
};

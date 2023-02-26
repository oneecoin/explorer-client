import { server } from "./server";

export const searchUsers = async (query: string) => {
    return await server.get("/users/search", {
        params: {
            q: query,
        },
    });
};

import { server } from "./server";

export const getMessages = async () => {
    const data = await server.get("/users/me/inbox");
    return data.data;
};

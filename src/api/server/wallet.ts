import { server } from "./server";
import { ISimplePassword } from "./types";

export const createSimplePassword = async ({
    private_key,
    simple_password,
}: ISimplePassword) => {
    const res = await server.post("/users/me/wallet/simple-password", {
        private_key,
        simple_password,
    });
    return res.status;
};

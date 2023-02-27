import { server } from "./server";
import { ISimplePassword, IWalletCandidate } from "./types";

export const createSimplePassword = async ({
    private_key,
    simple_password,
}: ISimplePassword) => {
    try {
        await server.post("/users/me/wallet/simple-password", {
            private_key,
            simple_password,
        });
        return true;
    } catch (err) {
        return false;
    }
};

export const replaceWallet = async ({ private_key, public_key }: IWalletCandidate) => {
    try {
        await server.put("/users/me/wallet", {
            private_key,
            public_key,
        });
        return true;
    } catch (e) {
        return false;
    }
};

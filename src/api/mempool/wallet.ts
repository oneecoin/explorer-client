import { mempool } from "./mempool";
import { IBalance, IWalletCreated } from "./types";

export const createWallet = async (): Promise<IWalletCreated> => {
    const res = await mempool.post("/wallets");
    return res.data;
};

export const getBalance = async (publicKey: string): Promise<IBalance> => {
    const res = await mempool.get("/", { params: publicKey });
    return res.data;
};

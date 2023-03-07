import { mempool } from "./mempool";
import { IBalance, ITransaction, ITransactionListElem, IWalletCreated } from "./types";

export const createWallet = async (): Promise<IWalletCreated> => {
    const res = await mempool.post("/wallets");
    return res.data;
};

export const getBalance = async (publicKey: string): Promise<IBalance> => {
    const res = await mempool.get(`/wallets/${publicKey}/balance`);
    return res.data;
};

export const getMyTransactions = async (publicKey: string): Promise<ITransaction[]> => {
    const res = await mempool.get(`/wallets/${publicKey}`);
    return res.data;
};

import { QueryFunctionContext } from "@tanstack/react-query";
import { mempool } from "./mempool";
import { ITransactionCreateForm } from "./types";

export const getMempoolTransactions = async () => {
    const res = await mempool.get("/mempool");
    return res.data;
};

export const getMempoolTransaction = async ({ queryKey }: QueryFunctionContext) => {
    const [_, txID] = queryKey;
    try {
        const res = await mempool.get(`/mempool/${txID}`);
        return res.data;
    } catch (e) {
        return undefined;
    }
};

export const createMempoolTransaction = async (form: ITransactionCreateForm) => {
    try {
        await mempool.post("/mempool", {
            ...form,
        });
        return true;
    } catch (e) {
        return false;
    }
};

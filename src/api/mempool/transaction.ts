import { QueryFunctionContext } from "@tanstack/react-query";
import { mempool } from "./mempool";

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

export const createMempoolTransaction = async () => {};

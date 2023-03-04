import { QueryFunctionContext } from "@tanstack/react-query";
import { mempool } from "./mempool";

export const getLatestBlock = async () => {
    const res = await mempool.get("/blocks/summary");
    return res.data;
};

export const getBlocks = async ({ queryKey }: QueryFunctionContext) => {
    const [, page] = queryKey;
    const res = await mempool.get("/blocks", {
        params: {
            page,
        },
    });
    return res.data;
};

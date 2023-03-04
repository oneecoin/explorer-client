import { mempool } from "./mempool";

export const getLatestBlock = async () => {
    const res = await mempool.get("/blocks/summary");
    return res.data;
};

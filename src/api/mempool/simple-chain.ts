import { mempool } from "./mempool";
import { ISimpleChainSummary } from "./types";

export const getSummary = async (): Promise<ISimpleChainSummary> => {
    const res = await mempool.get("/example-chain/summary");
    return res.data;
};

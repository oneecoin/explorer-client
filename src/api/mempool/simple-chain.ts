import { mempool } from "./mempool";
import { ISimpleChainCreateBlock, ISimpleChainSummary } from "./types";

export const getSummary = async (): Promise<ISimpleChainSummary> => {
    const res = await mempool.get("/example-chain/summary");
    return res.data;
};

export const createSimpleChainBlock = async (
    form: ISimpleChainCreateBlock
): Promise<string> => {
    try {
        const res = await mempool.post("/example-chain", {
            ...form,
        });
        if (res.status === 208) {
            return "duplicate";
        }
        return "ok";
    } catch (e) {
        return "invalid";
    }
};

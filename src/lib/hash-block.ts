import { sha256 } from "js-sha256";
import { ISimpleChainBlock } from "../api/mempool/types";

export const hashBlock = (block: ISimpleChainBlock): string => {
    block.hash = "";
    const str = JSON.stringify(block);
    return sha256(str);
};

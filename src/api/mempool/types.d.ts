export interface IWalletCreated {
    publicKey: string;
    privateKey: string;
}

export interface IBalance {
    balance: number;
}

export interface ISimpleChainSummary {
    height: number;
    latestHash: string;
}

export interface ISimpleChainBlock {
    data: string;
    publicKey: string;
    hash: string;
    prevHash: string;
    height: number;
    nonce: number;
}

export interface ISimpleChainBlockWithCreated extends ISimpleChainBlock {
    created: number;
}

export interface ISimpleChainBlocks {
    count: number;
    blocks: ISimpleChainBlock[];
}

export interface ISimpleChainCreateBlock {
    privateKey: string;
    block: ISimpleChainBlock;
}

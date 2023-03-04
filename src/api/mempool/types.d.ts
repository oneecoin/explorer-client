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
    blocks: ISimpleChainBlockWithCreated[];
}

export interface ISimpleChainCreateBlock {
    privateKey: string;
    block: ISimpleChainBlock;
}

export interface IPeersCount {
    count: number;
}

export interface ITransactionListElem {
    txID: string;
    isProccessing: boolean;
    from: string;
    to: string;
    amount: number;
}

interface TransactionInput {
    blockHash: string;
    txId: string;
    index: number;
    signature: string;
}

interface TransactionInputs {
    v: TransactionInput[];
    from: string;
}

interface TransactionOutput {
    publicKey: string;
    amount: number;
}

export interface ITransaction {
    id: string;
    timestamp: number;
    txIns: TransactionInputs;
    txOuts: TransactionOutput[];
}
export interface ITransactionRes {
    isProcessing: boolean;
    tx: ITransaction;
}

export interface IBalance {
    balance: number;
}

export interface IBlock {
    hash: string;
    prevHash: string;
    height: number;
    nonce: number;
    timestamp: number;
    transactions: ITransaction[];
}

export interface IBlockListElem {
    hash: string;
    height: number;
    timestamp: number;
    transactionsCount: number;
}

export interface ITransactionCreateForm {
    privateKey: string;
    to: string;
    amount: number;
}

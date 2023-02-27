export interface ITinyMe {
    pk: number;
    username: string;
    message_count: number;
    avatar: string;
}

export interface IMessage {
    title: string;
    content: string;
    message_type: string;
}

export interface IPublicUser {
    pk: number;
    username: string;
    public_key: string;
    avatar: string;
}

export interface IWallet {
    public_key: string;
    private_key_hash: string;
}

export interface IWalletCandidate {
    public_key: string;
    private_key: string;
}

export interface IMe {
    pk: number;
    email: string;
    username: string;
    wallet: IWallet;
    avatar: string;
}

export interface ISimplePassword {
    simple_password: string;
    private_key: string;
}

export interface IUsername {
    username: string;
}

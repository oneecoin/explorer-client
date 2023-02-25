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

enum StatusMSG {
    SEEN = "SEEN",
    NOT_SEEN = "NOT_SEEN"
}

interface IMessage {
    text: string | null
    fileUrl: string | null;
    id: string;
    status: StatusMSG;
    createdAt: Date;
    sender_id: string;
    receiver_id: string;
    chat_id: string;
}

interface IPartner {
    id: string;
    name: string;
    pictureUrl: string | null;
}

export interface IChatsData {
    chat_id: string;
    messages: IMessage[]
    partner: IPartner
    not_seen_messages: number
}
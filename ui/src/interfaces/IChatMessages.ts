enum StatusMSG {
    SEEN = "SEEN",
    NOT_SEEN = "NOT_SEEN"
}

export interface IChatMessages {
    text: string | null
    fileUrl: string | null;
    id: string;
    status: StatusMSG;
    createdAt: Date;
    sender_id: string;
    receiver_id: string;
    chat_id: string;
}
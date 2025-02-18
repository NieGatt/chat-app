export interface IMessageData {
    id: number;
    text: string | null;
    fileUrl: string | null;
    createdAt: Date;
    receiver_id: string;
    sender_id: string;
    chat_id: string;
    status: "SEEN" | "NOT_SEEN"
}
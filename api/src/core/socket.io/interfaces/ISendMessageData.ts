export interface ISendMessageData {
    text: string;
    user_id: string;
    partner_id: string,
    chat_id?: string;
    message_id?: number;
}
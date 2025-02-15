export interface IChatMessage {
    sender_id: string,
    receiver_id: string,
    chat_id: string | undefined,
    text: string | undefined,
    filePath: string | undefined
}
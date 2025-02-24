import { IChatMessages } from "./IChatMessages";

interface IPartner {
    id: string;
    name: string;
    pictureUrl: string | null;
}

export interface IChatsData {
    chat_id: string;
    messages: IChatMessages
    partner: IPartner
}
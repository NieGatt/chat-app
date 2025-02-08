import { prisma } from "../../../utils/prisma";
import { CloudinaryHandler } from "../../../utils/fileUploads/CloudinaryHandler";
import { v4 as uuid } from "uuid";

export const SendFileService = async (
    user_id: string,
    receiver_id: string,
    filePath: string,
    chat_id?: string
) => {
    const folderPath = `chat-name/${chat_id}`

    const cloudinaryHandler = new CloudinaryHandler()
    const url = await cloudinaryHandler.uploadfile(filePath, folderPath)

    const message = await prisma.message.create({
        data: {
            chat_id: chat_id ? chat_id : uuid(),
            sender_id: user_id,
            receiver_id,
            fileUrl: url
        }
    })
    return { message_id: message.id, chat_id: message.chat_id }
}
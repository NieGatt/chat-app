import { IChatMessage } from "../../../interfaces/IChatMessage";
import { prisma } from "../../../utils/prisma";
import { CloudinaryHandler } from "../../../utils/fileUploads/CloudinaryHandler";
import * as fs from "fs"

export const SendMessageService = async (data: IChatMessage) => {
    const chat = await prisma.chat.findFirst({ where: { id: data.chat_id } })

    if (!chat) return

    let fileUrl = ""

    if (data.filePath) {
        const foldrPath = `chat-uploads/${data.chat_id}`

        const cloudinaryHandler = new CloudinaryHandler()
        fileUrl = await cloudinaryHandler.uploadfile(data.filePath, foldrPath)

        fs.unlinkSync(data.filePath)
    }

    await prisma.message.create({
        data: {
            chat_id: chat.id,
            fileUrl,
            text: data.text,
            receiver_id: data.receiver_id,
            sender_id: data.sender_id
        }
    })
}
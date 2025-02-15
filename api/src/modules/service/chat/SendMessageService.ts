import { IChatMessage } from "../../../interfaces/IChatMessage";
import { prisma } from "../../../utils/prisma";
import { v4 } from "uuid";
import { CloudinaryHandler } from "../../../utils/fileUploads/CloudinaryHandler";
import * as fs from "fs"
import * as path from "path"

export const SendMessageService = async (data: IChatMessage) => {
    let chat = data.chat_id

    if (!chat) {
        chat = (await prisma.chat.findFirst({
            where: {
                AND: [
                    { users: { some: { id: data.sender_id } } },
                    { users: { some: { id: data.receiver_id } } }
                ]
            },
            select: { id: true }
        }))?.id
    }

    if (!chat) {
        chat = (await prisma.chat.create({
            data: {
                id: v4(),
                users: { connect: [{ id: data.sender_id }, { id: data.receiver_id }] }
            }, select: { id: true }
        })).id
    }

    let fileUrl = ""

    if (data.filePath) {
        const foldrPath = `chat-uploads/${chat}`

        const cloudinaryHandler = new CloudinaryHandler()
        fileUrl = await cloudinaryHandler.uploadfile(data.filePath, foldrPath)

        fs.unlinkSync(data.filePath)
    }

    await prisma.message.create({
        data: {
            chat_id: chat,
            fileUrl,
            text: data.text,
            receiver_id: data.receiver_id,
            sender_id: data.sender_id
        }
    })
}
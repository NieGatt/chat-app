import { Server, Socket } from "socket.io";
import { prisma } from "../../../utils/prisma";
import { v4 as uuid } from "uuid";
import { IMessageData } from "../interfaces/IMessageData";
import { ISendMessageData } from "../interfaces/ISendMessageData";

export const SendMessage = (socket: Socket, io: Server) => {
    socket.on("send-new-message", async (data: ISendMessageData) => {
        const chat = data.chat_id ?? uuid()
        let message: IMessageData
        
        const selectedFields = {
            id: true, text: true, fileUrl: true,
            status: true, chat_id: true, receiver_id: true,
            sender_id: true, createdAt: true
        }

        if (data.message_id) {
            message = await prisma.message.update({
                where: { id: data.message_id },
                data: {
                    chat_id: chat,
                    text: data.text,
                    sender_id: data.user_id,
                    receiver_id: data.partner_id
                },
                select: selectedFields
            })
            return io.to(chat).emit("new-message-sent", message)
        }

        message = await prisma.message.create({
            data: {
                chat_id: chat,
                text: data.text,
                sender_id: data.user_id,
                receiver_id: data.partner_id
            },
            select: selectedFields
        })
        return io.to(chat).emit("new-message-sent", message)
    })
}
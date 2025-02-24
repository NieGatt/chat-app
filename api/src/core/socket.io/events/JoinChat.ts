import { Socket } from "socket.io";
import { prisma } from "../../../utils/prisma";

export const joinChat = (socket: Socket) => {
    socket.on("join-chat", async (chat_id: string) => {
        const messages = await prisma.message.findMany({
            where: { chat_id },
            select: {
                id: true,
                text: true,
                fileUrl: true,
                createdAt: true,
                status: true,
                sender_id: true,
                receiver_id: true,
                chat_id: true
            }
        })
        socket.join(chat_id)
        socket.emit("messages", messages ?? [])
    })
}
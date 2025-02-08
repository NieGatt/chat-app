import { Server, Socket } from "socket.io";
import { prisma } from "../../../utils/prisma";

export const ChangeMessageStatus = (socket: Socket, io: Server) => {
    socket.on("change-messages-status", async (user_id: string, chat_id: string) => {
        const messages = await prisma.message.findMany({
            where: {
                chat_id,
                status: "NOT_SEEN",
                receiver_id: user_id
            }
        })
        if (!messages) return

        await prisma.message.updateMany({
            where: {
                chat_id,
                receiver_id: user_id
            }, data: { status: "SEEN" }
        })

        const data = await prisma.message.findMany({
            where: { chat_id },
            select: {
                id: true, text: true, fileUrl: true,
                status: true, chat_id: true, receiver_id: true,
                sender_id: true, createdAt: true
            }
        })

        return io.to(chat_id).emit("changed-messages-status", data)
    })
}
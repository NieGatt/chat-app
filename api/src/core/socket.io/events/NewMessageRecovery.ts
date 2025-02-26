import { Server, Socket } from "socket.io";
import { prisma } from "../../../utils/prisma";

export const NewMessageRecovery = (socket: Socket, io: Server) => {
    socket.on("new-message-recovery", async (chat_id: string) => {
        const message = await prisma.message.findFirst({
            where: { chat_id, status: "NOT_SEEN" },
            orderBy: { createdAt: "desc" }
        })

        if (message) {
            io.to(chat_id).emit("new-message", message)
        }
    })
}
import { prisma } from "../../../utils/prisma";

export const FindUserChatsService = async (id: string) => {
    const chats = await prisma.chat.findMany({
        where: {
            users: { some: { id } }
        },
        select: {
            id: true,
            messages: {
                take: 1,
                select: {
                    text: true,
                    fileUrl: true,
                    status: true,
                    createdAt: true,
                    id: true,
                    receiver_id: true,
                    sender_id: true,
                    chat_id: true
                },
                orderBy: { createdAt: "desc" }
            },
            users: {
                where: { id: { not: id } },
                take: 1,
                select: {
                    id: true,
                    name: true,
                    pictureUrl: true
                }
            }
        }
    })

    if (chats.length === 0) return []

    const data = chats.map(chat => {
        return {
            chat_id: chat.id,
            messages: chat.messages[0],
            partner: chat.users[0]
        }
    })

    return data
}      
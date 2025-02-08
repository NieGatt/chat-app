import { prisma } from "../../../utils/prisma";

export const FindUserChatsService = async (id: string) => {
    const chats = await prisma.chat.findMany({
        where: {
            users: {
                some: {
                    id: id
                }
            }
        },
        select: {
            id: true,
            messages: {
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
                orderBy: {
                    createdAt: "desc"
                }
            },
            users: {
                where: {
                    id: { not: id },
                },
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
            messages: chat.messages.map(message => ({
                text: message.text,
                fileUrl: message.fileUrl,
                status: message.status,
                createdAt: message.createdAt,
                sender_id: message.sender_id,
                receiver_id: message.receiver_id,
                chat_id: message.chat_id
            })),
            partner: chat.users.map(partner => ({
                id: partner.id,
                name: partner.name,
                pictureUrl: partner.pictureUrl
            }))
        }
    })

    return data
}      
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
                    user: {
                        select: {
                            id: true,
                            name: true,
                            pictureUrl: true
                        }
                    }
                }
            }
        }
    })
    if (chats.length === 0) return []

    const data = chats.map(chat => {
        return {
            chat_id: chat.id,
            messages: chat.messages.map(message => ({
                user: {
                    id: message.user.id,
                    name: message.user.name,
                    pictureUrl: message.user.pictureUrl
                },
                text: message.text,
                fileUrl: message.fileUrl,
                status: message.status,
                createdAt: message.createdAt
            }))
        }
    })

    return data
}
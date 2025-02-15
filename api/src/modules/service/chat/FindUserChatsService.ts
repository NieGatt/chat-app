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
            _count: {
                select: {
                    messages: {
                        where: { status: "NOT_SEEN" }
                    }
                }
            },
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
            not_seen_messages: chat._count.messages,
            partner: chat.users[0]
        }
    })

    return data
}      
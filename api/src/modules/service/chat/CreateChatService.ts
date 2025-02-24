import { BadRequest } from "../../../utils/exceptions/ExceptionHandler";
import { prisma } from "../../../utils/prisma";

export const CreateChatService = async (id: string, partner_id: string) => {
    const chat = await prisma.chat.findFirst({
        where: {
            AND: [
                { users: { some: { id } } },
                { users: { some: { id: partner_id } } }
            ]
        }
    })

    if (chat) throw new BadRequest("Chat already exists")

    await prisma.chat.create({
        data: {
            users: {
                connect: [{ id }, { id: partner_id }]
            }
        }
    })
}
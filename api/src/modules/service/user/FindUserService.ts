import { prisma } from "../../../utils/prisma";

export const FindUserService = async (id: string, name: string) => {
    const data = await prisma.user.findMany({
        where: {
            AND: [
                { id: { not: id } },
                { name: { contains: name, mode: "insensitive" } },
                { chats: { none: { users: { some: { id } } } } }
            ]
        },
        select: {
            id: true,
            name: true,
            pictureUrl: true
        }
    })
    return data ?? []
}
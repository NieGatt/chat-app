import { prisma } from "../../../utils/prisma";

export const ReadUserDataService = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            pictureUrl: true,
            type: true
        }
    })
}
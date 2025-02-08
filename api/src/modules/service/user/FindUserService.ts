import { IFindUser } from "../../../interfaces/IFindUser";
import { prisma } from "../../../utils/prisma";

export const FindUserService = async (data: IFindUser) => {
    const usersCount = await prisma.user.count({
        where: {
            id: { not: data.id },
            name: {
                contains: data.name,
                mode: "insensitive"
            }
        }
    })

    const pageSize = 10
    const totalPages = Math.ceil(usersCount / pageSize)

    const pageNumber = !totalPages
        ? 1
        : data.page > totalPages
            ? totalPages
            : data.page

    const users = await prisma.user.findMany({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        where: {
            id: { not: data.id },
            name: {
                contains: data.name,
                mode: "insensitive"
            }
        },
        select: {
            id: true,
            name: true,
            pictureUrl: true
        },
        orderBy: { createdAt: "asc" }
    })
    return {
        page: pageNumber,
        total_pages: totalPages ? totalPages : 1,
        total_items: usersCount,
        items: users
    }
}
import { prisma } from "../../../utils/prisma";

export const FindUserService = async (id: string, name: string, page: number) => {
    const usersCount = await prisma.user.count({
        where: {
            id: { not: id },
            name: {
                contains: name,
                mode: "insensitive"
            }
        }
    })

    const pageSize = 10
    const totalPages = Math.ceil(usersCount / pageSize)

    const pageNumber = !totalPages
        ? 1
        : page > totalPages
            ? totalPages
            : page

    const users = await prisma.user.findMany({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        where: {
            id: { not: id },
            name: {
                contains: name,
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
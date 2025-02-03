import { prisma } from "../../../utils/other/prisma"

export const ValidateServie = async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id } })
    if (user?.verified) return
    await prisma.user.update({
        where: { id }, data: { verified: true }
    })
}
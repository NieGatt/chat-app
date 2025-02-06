import { prisma } from "../../../utils/prisma";

export const LogoutService = async (id: string) => {
    await prisma.user.update({ where: { id }, data: { refreshToken: null } })
}
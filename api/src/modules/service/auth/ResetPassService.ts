import { HashingHandler } from "../../../utils/HashingHandler"
import { prisma } from "../../../utils/prisma"

export const ResetPassServie = async (id: string, password: string) => {
    password = HashingHandler.hashData(password)
    await prisma.user.update({
        where: { id: id }, data: { password: password }
    })
}
import { HashingHandler } from "../../utils/other/HashingHandler"
import { prisma } from "../../utils/other/prisma"

export const ChangePassServie = async (id: string, password: string) => {
    const hashingHandler = new HashingHandler()
    password = hashingHandler.hashData(password)
    await prisma.user.update({
        where: { id: id }, data: { password: password }
    })
}
import { prisma } from "../../../utils/prisma";
import { HashingHandler } from "../../../utils/HashingHandler";
import { BadRequest, Conflict } from "../../../utils/exceptions/ExceptionHandler";
import { IResetPass } from "../../../interfaces/IResetPass";

export const UserResetPassService = async (data: IResetPass) => {
    const user = await prisma.user.findUnique({ where: { id: data.id } })

    if (!user) return

    else if (user.password) {
        const isTheSame = HashingHandler.compareData(data.password, user.password)
        if (isTheSame) throw new Conflict("Password cannot be equal to the current one")
    }

    else if (user?.type === "STANDARD_AUTH") {
        if (!data.currentPassword) return

        const isEqual = HashingHandler.compareData(data.currentPassword, user.password!)
        if (!isEqual) throw new BadRequest("Incorrect current password")
    }

    const hashedPass = HashingHandler.hashData(data.password)
    await prisma.user.update({ where: { id: user.id }, data: { password: hashedPass } })
}
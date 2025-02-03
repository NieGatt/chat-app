import { prisma } from "../../../utils/other/prisma";
import { HashingHandler } from "../../../utils/other/HashingHandler";
import { IUserResetPass } from "../../../interfaces/IUserResetPass";
import { BadRequest, Conflict } from "../../../utils/exceptions/ExceptionHandler";

interface User extends IUserResetPass {
    id: string
}

export const UserResetPassService = async (data: User) => {
    const user = await prisma.user.findUnique({ where: { id: data.id } })
    const hashingHandler = new HashingHandler()

    if (user?.type === "GOOGLE_OAUTH20") {
        if (user.password) {
            const isTheSame = hashingHandler.compareData(data.password, user.password)
            if (isTheSame)
                throw new Conflict("The new password cannot be equal to the current one")
        }

        const hashedPass = hashingHandler.hashData(data.password)
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPass }
        })
        return
    }

    else if (user?.type === "STANDARD_AUTH" && data.currentPassword) {
        const isTheSame = hashingHandler.compareData(data.password, user.password!)
        if (isTheSame)
            throw new Conflict("The new password cannot be equal to the current one")

        const isEqual = hashingHandler.compareData(data.currentPassword, user.password!)
        if (!isEqual) throw new BadRequest("Incorrect password")

        const hashedPass = hashingHandler.hashData(data.password)
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPass }
        })
    }
}
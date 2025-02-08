import { ILoginUser } from "../../../interfaces/ILoginUser";
import { NotFound, Unauthorized } from "../../../utils/exceptions/ExceptionHandler";
import { HashingHandler } from "../../../utils/HashingHandler";
import { JwtTokenHandler } from "../../../utils/JwtTokenHandler";
import { prisma } from "../../../utils/prisma";

export const LoginService = async (data: Readonly<ILoginUser>) => {
    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user) throw new NotFound("User not found");

    else if (!user.verified) throw new Unauthorized("Unverified email address")

    const isEqual = HashingHandler.compareData(data.password, user.password!)

    if (!isEqual) throw new NotFound("Incorrect email or password")

    const accessToken = JwtTokenHandler.accessToken(user.id)
    const refreshToken = JwtTokenHandler.refreshToken(user.id)

    await prisma.user.update({
        where: { id: user.id }, data: { refreshToken: refreshToken }
    })

    return accessToken
}
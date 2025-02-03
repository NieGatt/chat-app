import { ILoginUser } from "../../../interfaces/ILoginUser";
import { NotFound, Unauthorized } from "../../../utils/exceptions/ExceptionHandler";
import { HashingHandler } from "../../../utils/other/HashingHandler";
import { JwtTokenHandler } from "../../../utils/other/JwtTokenHandler";
import { prisma } from "../../../utils/other/prisma";

export const LoginService = async (data: ILoginUser) => {
    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user) throw new NotFound("User Not Found.");

    else if (!user.verified) throw new Unauthorized("Unverified email address.")

    const hashingHandler = new HashingHandler();
    const isEqual = hashingHandler.compareData(data.password, user.password!)

    if (!isEqual) throw new NotFound("Incorrect email or password")

    const jwtTokenHandler = new JwtTokenHandler()
    const accessToken = jwtTokenHandler.accessToken(user.id)
    const refreshToken = jwtTokenHandler.refreshToken(user.id)

    await prisma.user.update({
        where: { id: user.id }, data: { refreshToken: refreshToken }
    })

    return accessToken
}
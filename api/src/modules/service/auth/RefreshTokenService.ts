import { NotFound, Unauthorized } from "../../../utils/exceptions/ExceptionHandler";
import { JwtTokenHandler } from "../../../utils/other/JwtTokenHandler";
import { prisma } from "../../../utils/other/prisma";

export const RefreshTokenService = async (token: string) => {
    const jwtTokenHandler = new JwtTokenHandler()
    const decode = jwtTokenHandler.docodeAnyToken(token) as { sub: string }
    if (!decode.sub) throw new Unauthorized("Malformed refresh token")

    const user = await prisma.user.findUnique({ where: { id: decode.sub } })
    if (!user) throw new NotFound("User not found")

    jwtTokenHandler.verifyRefreshToken(user.refreshToken!)
    return jwtTokenHandler.accessToken(user.id)
}
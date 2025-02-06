import { NotFound, Unauthorized } from "../../../utils/exceptions/ExceptionHandler";
import { JwtTokenHandler } from "../../../utils/JwtTokenHandler";
import { prisma } from "../../../utils/prisma";

export const RefreshTokenService = async (token: string) => {
    const decode = JwtTokenHandler.decodeAnyToken(token) as { sub: string }
    if (!decode.sub) throw new Unauthorized("Malformed refresh token")

    const user = await prisma.user.findUnique({ where: { id: decode.sub } })
    if (!user) throw new NotFound("User not found")

    JwtTokenHandler.verifyRefreshToken(user.refreshToken!)
    return JwtTokenHandler.accessToken(user.id)
}
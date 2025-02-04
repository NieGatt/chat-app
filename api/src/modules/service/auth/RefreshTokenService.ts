import { NotFound, Unauthorized } from "../../../utils/exceptions/ExceptionHandler";
import { JwtTokenHandler } from "../../../utils/other/JwtTokenHandler";
import { prisma } from "../../../utils/other/prisma";

export const RefreshTokenService = async (token: string) => {
    const secret = process.env.REFRESH_SECRET!

    const jwtTokenHandler = new JwtTokenHandler()
    const decode = jwtTokenHandler.decodeToken(token) as { sub: string }
    if (!decode.sub) throw new Unauthorized("Malformed access token")

    const user = await prisma.user.findUnique({ where: { id: decode.sub } })
    if (!user) throw new NotFound("User not found")

    jwtTokenHandler.verifyToken(user.refreshToken!, secret)
    return jwtTokenHandler.accessToken(user.id)
}
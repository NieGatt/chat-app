import { IGoogleLoginUser } from "../../../interfaces/IGoogleLoginUser";
import { prisma } from "../../../utils/prisma";
import { JwtTokenHandler } from "../../../utils/JwtTokenHandler";

export const GoogleLoginService = async (data: IGoogleLoginUser) => {
    const user = await prisma.user.findUnique({ where: { email: data.email } })

    const accessToken = JwtTokenHandler.accessToken(user?.id ?? data.id);
    const refreshToken = JwtTokenHandler.refreshToken(user?.id ?? data.id);

    if (user) {
        await prisma.user.update({
            where: { id: user.id }, data: { refreshToken: refreshToken }
        })
        return accessToken
    }

    await prisma.user.create({
        data: {
            ...data,
            verified: true,
            type: "GOOGLE_OAUTH20"
        }
    });
    return accessToken
}
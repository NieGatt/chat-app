import { IGoogleLoginUser } from "../../interfaces/IGoogleLoginUser";
import { prisma } from "../../utils/other/prisma";
import { JwtTokenHandler } from "../../utils/other/JwtTokenHandler";

export const GoogleLoginService = async (data: IGoogleLoginUser) => {
    const user = await prisma.user.findUnique({ where: { email: data.email } })

    const jwtTokenHandler = new JwtTokenHandler();
    const accessToken = jwtTokenHandler.accessToken(user?.id ?? data.id);
    const refreshToken = jwtTokenHandler.refreshToken(user?.id ?? data.id);

    if (user) {
        await prisma.user.update({
            where: { id: user.id }, data: { refreshToken: refreshToken }
        })
        return accessToken
    }

    await prisma.user.create({ data: { ...data, verified: true } });
    return accessToken
}
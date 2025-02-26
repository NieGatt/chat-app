import { IRegisterUser } from "../../../interfaces/IRegisterUser";
import { Conflict } from "../../../utils/exceptions/ExceptionHandler";
import { prisma } from "../../../utils/prisma";
import { JwtTokenHandler } from "../../../utils/JwtTokenHandler";
import { HashingHandler } from "../../../utils/HashingHandler";
import { deliverEmail } from "../../../utils/nodemailer/EmailSendingHandler";

export const RegisterService = async (data: IRegisterUser) => {
    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (user) throw new Conflict("Email already in use");

    const verificationToken = JwtTokenHandler.verificationToken(data.id);

    data.password = HashingHandler.hashData(data.password);

    const newUser = await prisma.user.create({ data: { ...data } });

    await deliverEmail({
        name: newUser.name,
        email: newUser.email,
        token: verificationToken,
        template: "email-verification"
    });
}
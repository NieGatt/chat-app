import { IRegisterUser } from "../../interfaces/IRegisterUser";
import { Conflict } from "../../utils/exceptions/ExceptionHandler";
import { prisma } from "../../utils/other/prisma";
import { JwtTokenHandler } from "../../utils/other/JwtTokenHandler";
import { HashingHandler } from "../../utils/other/HashingHandler";
import { EmailSendingHandler } from "../../utils/nodemailer/EmailSendingHandler";

export const RegisterService = async (data: IRegisterUser) => {
    const user = await prisma.user.findUnique({where: { email: data.email }});
    
    if (user) throw new Conflict("Email already in use.");

    const jwtTokenHandler = new JwtTokenHandler();
    const verificationToken = jwtTokenHandler.verificationToken(data.id);

    const hashingHandler = new HashingHandler();
    data.password = hashingHandler.hashData(data.password);

    const newUser = await prisma.user.create({ data: { ...data } });

    if (newUser) {
        const emailSeingHandler = new EmailSendingHandler();
        await emailSeingHandler.deliverEmail({
            name: newUser.name,
            email: newUser.email,
            token: verificationToken,
            templateName: "email-verification"
        });
    }
}
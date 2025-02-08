import { NotFound } from "../../../utils/exceptions/ExceptionHandler";
import { deliverEmail } from "../../../utils/nodemailer/EmailSendingHandler";
import { JwtTokenHandler } from "../../../utils/JwtTokenHandler";
import { prisma } from "../../../utils/prisma";
import { ISendVerification } from "../../../interfaces/ISendVerification";

export const SendVerificationService = async (data: ISendVerification) => {
    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user) throw new NotFound("User not found");

    const verificationToken = JwtTokenHandler.verificationToken(user.id);
    
    await deliverEmail({
        name: user.name,
        email: user.email,
        token: verificationToken,
        template: data.template
    });
}
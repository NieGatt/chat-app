import { TemplateType } from "../../../types/TemplateType";
import { NotFound } from "../../../utils/exceptions/ExceptionHandler";
import { EmailSendingHandler } from "../../../utils/nodemailer/EmailSendingHandler";
import { JwtTokenHandler } from "../../../utils/other/JwtTokenHandler";
import { prisma } from "../../../utils/other/prisma";

export const SendVerificationService = async (
    email: string,
    template: TemplateType
) => {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) throw new NotFound("User not found");

    const jwtTokenHandler = new JwtTokenHandler();
    const verificationToken = jwtTokenHandler.verificationToken(user.id);

    const emailSendingHandler = new EmailSendingHandler();
    
    await emailSendingHandler.deliverEmail({
        name: user.name,
        email: user.email,
        token: verificationToken,
        templateName: template
    });
}
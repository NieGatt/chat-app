import { TemplateType } from "../../../types/TemplateType";
import { NotFound } from "../../../utils/exceptions/ExceptionHandler";
import { deliverEmail } from "../../../utils/nodemailer/EmailSendingHandler";
import { JwtTokenHandler } from "../../../utils/JwtTokenHandler";
import { prisma } from "../../../utils/prisma";

export const SendVerificationService = async (
    email: string,
    template: TemplateType
) => {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) throw new NotFound("User not found");

    const verificationToken = JwtTokenHandler.verificationToken(user.id);
    
    await deliverEmail({
        name: user.name,
        email: user.email,
        token: verificationToken,
        templateName: template
    });
}
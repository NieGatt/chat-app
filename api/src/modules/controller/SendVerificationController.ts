import { Request, Response } from "express";
import { SendVerificationService } from "../service/SendVeriicationService";

export const SendVerificationController = async (req: Request, res: Response) => {
    const { template } = req.params as { template: "EmailVerification" | "PasswordReset" }
    const { email } = req.body

    await SendVerificationService(email, template);

    res.status(200).json({
        result: `We sent an email to ${email}`,
        statusCode: 200
    });
}
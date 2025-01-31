import { Request, Response } from "express";
import { SendVerificationService } from "../service/SendVeriicationService";
import { TemplateType } from "../../types/TemplateType";

export const SendVerificationController = async (req: Request, res: Response) => {
    const template = req.params.template as TemplateType
    const { email } = <{ email: string }>req.body

    await SendVerificationService(email, template);

    res.status(200).json({
        result: `We sent an email to ${email}`,
        statusCode: 200
    });
}
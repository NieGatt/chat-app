import { Request, Response } from "express";
import { SendVerificationService } from "../../service/auth/SendVeriicationService";
import { ISendVerification } from "../../../interfaces/ISendVerification";

type Template = "email-verification" | "forgot-password"

export const SendVerificationController = async (req: Request, res: Response) => {
    const data: ISendVerification = {
        email: req.body.email,
        template: req.params.template as Template
    }

    await SendVerificationService(data);

    res.status(200).json({
        result: `We sent an email to ${data.email}`,
        statusCode: 200
    });
}
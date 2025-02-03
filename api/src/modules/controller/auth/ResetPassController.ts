import { Request, Response } from "express";
import { ResetPassServie } from "../../service/auth/ResetPassService";

export const ResetPassController = async (req: Request, res: Response) => {
    const { password } = req.body as { password: string }
    const { id } = req.user as { id: string }
    await ResetPassServie(id, password);
    res.status(200).json({
        result: "Ok",
        statusCode: 200
    })
}
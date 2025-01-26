import { Request, Response } from "express";
import { ChangePassServie } from "../service/ChangePassService";

export const ChangePassController = async (req: Request, res: Response) => {
    const { password } = req.body as { password: string }
    const { id } = req.user as { id: string }
    await ChangePassServie(id, password);
    res.status(200).json({
        result: "Ok",
        statusCode: 200
    })
}
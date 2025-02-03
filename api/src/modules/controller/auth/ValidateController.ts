import { Response } from "express";
import { ValidateServie } from "../../service/auth/ValidateService";

export const ValidateController = async (req: any, res: Response) => {
    const id = req.user.id
    await ValidateServie(id)
    res.status(200).json({
        result: "Ok",
        statusCode: 200
    })
}
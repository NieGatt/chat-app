import { Request, Response } from "express";
import { UserResetPassService } from "../../service/user/UserResetPassService";
import { IResetPass } from "../../../interfaces/IResetPass";

export const UserResetPassController = async (req: Request, res: Response) => {
    const { id } = req.user as { id: string }
    const data = <IResetPass>req.body

    await UserResetPassService({
        id, password: data.password,
        currentPassword: data.currentPassword
    })
    
    res.status(200).json({
        result: "ok",
        statusCode: 200
    })
}
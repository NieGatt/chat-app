import { Request, Response } from "express";
import { IUserResetPass } from "../../../interfaces/IUserResetPass";
import { UserResetPassService } from "../../service/user/UserResetPassService";

export const UserResetPassController = async (req: Request, res: Response) => {
    const { id } = req.user as { id: string }
    const data = <IUserResetPass>req.body

    await UserResetPassService({
        id, password: data.password,
        currentPassword: data.currentPassword
    })
    
    res.status(200).json({
        result: "ok",
        statusCode: 200
    })
}
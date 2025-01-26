import { Response, Request } from "express";
import { LogoutService } from "../service/LogoutService";

export const LogoutController = async (req: Request, res: Response) => {
    const { id } = req.user as { id: string }
    await LogoutService(id)

    res.clearCookie("Authorization");
    res.status(200).json({
        result: "Ok",
        statusCode: 200
    })
}
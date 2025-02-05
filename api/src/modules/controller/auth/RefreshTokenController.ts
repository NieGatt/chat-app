import { Request, Response } from "express";
import { Unauthorized } from "../../../utils/exceptions/ExceptionHandler";
import { RefreshTokenService } from "../../service/auth/RefreshTokenService";

export const RefreshTokenController = async (req: Request, res: Response) => {
    const token = req.cookies["Authorization"]

    if (!token && typeof token === "string")
        throw new Unauthorized("Authorization cookie is missing");

    const accessToken = await RefreshTokenService(token)

    res.cookie("Authorization",
        accessToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
        result: "Ok",
        statuscode: 200
    })
}
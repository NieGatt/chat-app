import { Request, Response } from "express";
import { LoginService } from "../service/LoginService";
import { ILoginUser } from "../../interfaces/ILoginUser";

export const LoginController = async (req: Request, res: Response) => {
    const { email, password }: ILoginUser = req.body

    const accessToken = await LoginService({ email, password })

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
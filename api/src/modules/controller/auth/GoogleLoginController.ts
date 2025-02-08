import { Response } from "express";
import { v4 as uuid } from "uuid";
import { GoogleLoginService } from "../../service/auth/GoogleLoginService";
import { IGoogleUser } from "../../../interfaces/IGoogleUser";

export const GoogleLoginController = async (req: any,  res: Response) => {
    const { email, name, pictureUrl }: IGoogleUser = req.user

    const accessToken = await GoogleLoginService({ 
        id: uuid(),
        email,
        name,
        pictureUrl
     });

    res.cookie("Authorization",
        accessToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect("http://localhost:5173")
}
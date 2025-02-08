import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { RegisterService } from "../../service/auth/RegisterService";
import { IRegisterUser } from "../../../interfaces/IRegisterUser";

export const RegisterController = async (req: Request, res: Response) => {
    const { name, email, password }: IRegisterUser = req.body
    await RegisterService({ id: uuid(), name, email, password })

    res.status(201).json({
        result: `We sent an email to ${email}`,
        statusCode: 201,
    });
}

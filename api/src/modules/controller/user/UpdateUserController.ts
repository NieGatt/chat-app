import { Request, Response } from "express";
import { UpdateUserService } from "../../service/user/UpdateUserService";

export const UpdateUserController = async (req: Request, res: Response) => {
    const { id } = <{ id: string }>req.user
    const filePath = req.file?.path
    const name = req.body.name

    await UpdateUserService(id, name, filePath)
    res.status(200).json({
        result: "ok",
        statusCode: 200
    })
}
import { Request, Response } from "express";
import { ReadUserDataService } from "../../service/user/ReadUserdataService";

export const ReadUserDataController = async (req: Request, res: Response) => {
    const { id } = req.user as { id: string }
    const data = await ReadUserDataService(id)
    res.status(200).json(data)
}
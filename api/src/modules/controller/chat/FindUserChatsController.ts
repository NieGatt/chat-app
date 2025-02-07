import { Request, Response } from "express";
import { FindUserChatsService } from "../../service/chat/FindUserChatsService";

export const FindUserChatsController = async (req: Request, res: Response) => {
    const { id } = <{ id: string }>req.user
    const result = await FindUserChatsService(id)
    res.status(200).json(result)
}
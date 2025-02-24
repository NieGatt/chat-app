import { Request, Response } from "express";
import { CreateChatService } from "../../service/chat/CreateChatService";

export const CreateChatController = async (req: Request, res: Response) => {
    const { id } = req.user as { id: string }
    const partner_id = req.params.partner_id

    await CreateChatService(id, partner_id)
    res.status(201).json({ result: "Ok", code: 201 })
}
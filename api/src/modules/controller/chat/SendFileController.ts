import { Request, Response } from "express";
import { SendFileService } from "../../service/chat/SendFileService";

export const SendFileController = async (req: Request, res: Response) => {
    const filePath = req.file!.path
    const { id } = <{ id: string }>req.user
    const receiver_id = req.params.receiver_id
    const chat_id = req.params?.chat_id as string | undefined

    const data = await SendFileService(id, receiver_id, filePath, chat_id)
    res.status(200).json(data)
}
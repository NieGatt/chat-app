import { Request, Response } from "express"
import { SendMessageService } from "../../service/chat/SendMessageService"
import { BadRequest } from "../../../utils/exceptions/ExceptionHandler"

export const SendMessageController = async (req: Request, res: Response) => {
    const { id: sender_id } = req.user as { id: string }
    const { receiver_id } = req.params as { receiver_id: string }
    const chat_id: string | undefined = req.params?.chat_id
    const text: string | undefined = req.body?.text
    const filePath = req.file?.path

    if (!text && !filePath) throw new BadRequest("At least one field is required")

    await SendMessageService({ sender_id, receiver_id, chat_id, text, filePath })
    res.status(201).json({
        result: "Ok",
        code: 201
    })
}
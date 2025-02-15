import { Request, Response } from "express"
import { SendMessageService } from "../../service/chat/SendMessageService"

export const SendMessageController = async (req: Request, res: Response) => {
    const { id: sender_id } = req.user as { id: string }
    const { receiver_id } = req.params as { receiver_id: string }
    const chat_id: string | undefined = req.params?.chat_id
    const text: string | undefined = req.body?.text
    const file = req.file?.path

    await SendMessageService({ sender_id, receiver_id, chat_id, text, file })
    res.status(201).json({
        result: "Ok",
        code: 201
    })
}
import { Request, Response } from "express"
import { FindUserService } from "../../service/user/FindUserService"

export const FindUserController = async (req: Request, res: Response) => {
    const { id } = <{ id: string }>req.user
    const name = decodeURIComponent(req.params.name as string)

    const users = await FindUserService(id, name)
    res.status(200).json(users)
}
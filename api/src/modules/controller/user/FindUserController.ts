import { Request, Response } from "express"
import { FindUserService } from "../../service/user/FindUserService"

export const FindUserController = async (req: Request, res: Response) => {
    const { id } = <{ id: string }>req.user
    const { name } = <{ name: string }>req.params
    const page = req.query?.page

    const users = await FindUserService({ id, name, page: page ? Number(page) : 1 })
    res.status(200).json(users)
}
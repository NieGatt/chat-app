import { prisma } from "../../../utils/prisma";
import { CloudinaryHandler } from "../../../utils/fileUploads/CloudinaryHandler";
import * as fs from "fs";
import * as path from "path";
import { IUpdateUser } from "../../../interfaces/IUpdateUser";

export const UpdateUserService = async (data: IUpdateUser) => {
    if (data.filePath) {
        const directory = path.dirname(data.filePath)
        const newPath = path.join(directory, `${data.id}${path.extname(data.filePath)}`)

        fs.renameSync(data.filePath, newPath)

        const foldrPath = "profile-pictures"

        const cloudinaryHandler = new CloudinaryHandler()
        const url = await cloudinaryHandler.uploadProflePicture(newPath, foldrPath)

        await prisma.user.update({
            where: { id: data.id },
            data: {
                pictureUrl: url
            }
        })

        fs.unlinkSync(newPath)
    }

    await prisma.user.update({
        where: { id: data.id },
        data: { name: data.name }
    })
}
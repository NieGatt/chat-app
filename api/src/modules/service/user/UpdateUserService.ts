import { prisma } from "../../../utils/prisma";
import { CloudinaryHandler } from "../../../utils/fileUploads/CloudinaryHandler";
import * as fs from "fs";
import * as path from "path";

export const UpdateUserService = async (
    id: string,
    name: string,
    filePath?: string
) => {    
    if (filePath) {
        const directory = path.dirname(filePath)
        const newPath = path.join(directory, `${id}${path.extname(filePath)}`)

        fs.renameSync(filePath, newPath)

        const foldrPath = "profile-pictures"

        const cloudinaryHandler = new CloudinaryHandler()
        const url = await cloudinaryHandler.uploadProflePicture(newPath, foldrPath)

        await prisma.user.update({
            where: { id },
            data: {
                pictureUrl: url
            }
        })

        fs.unlinkSync(newPath)
    }

    await prisma.user.update({ where: { id }, data: { name } })
}
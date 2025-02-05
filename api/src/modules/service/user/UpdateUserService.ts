import { prisma } from "../../../utils/other/prisma";
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

        const cloudinaryHandler = new CloudinaryHandler()
        const result = await cloudinaryHandler.uploadProflePicture(newPath)

        await prisma.user.update({
            where: { id },
            data: {
                pictureId: result.picture_id,
                pictureUrl: result.url
            }
        })

        fs.unlinkSync(newPath)
    }

    await prisma.user.update({ where: { id }, data: { name } })
}
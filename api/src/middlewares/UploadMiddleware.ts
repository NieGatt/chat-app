import multer from "multer"
import * as path from "path";
import { BadRequest } from "../utils/exceptions/ExceptionHandler";

export const UploadMiddleware = (
    setLimit: number,
    setFileTypes: string[]
) => {
    const storage = multer.diskStorage({
        destination(req, file, callback) {
            const base = "src/utils/fileUploads/uploads"
            const filePath = path.resolve(process.cwd(), base)
            return callback(null, filePath)
        },
        filename(req, file, callback) {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
            const fileName = uniqueSuffix + path.extname(file.originalname)
            return callback(null, fileName)
        },
    })

    const upload = multer({
        storage,
        limits: { fileSize: setLimit },
        fileFilter(req, file, callback) {
            if (!file) return callback(null, true)

            if (!setFileTypes.includes(file.mimetype)) {
                const mimeTypes = setFileTypes.map(type => type.split("/")[1])
                const exts = mimeTypes.join(", ").toLowerCase()
                return callback(new BadRequest(`File extension do not match ${exts}`))
            }

            return callback(null, true)
        },
    })

    return upload
}
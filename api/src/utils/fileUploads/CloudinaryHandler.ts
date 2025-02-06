import { cloudinary } from "./CloudinaryConfig";

export class CloudinaryHandler {
    async uploadProflePicture(
        filePath: string,
        folderPath: string
    ) {
        const result = await cloudinary.uploader.upload(
            filePath,
            {
                use_filename: true,
                overwrite: true,
                unique_filename: false,
                chunk_size: 10000,
                folder: `chat-app/${folderPath}`
            }
        )

        return { picture_id: result.public_id, url: result.url }
    }
}
import { cloudinary } from "./CloudinaryConfig";

export class CloudinaryHandler {
    async uploadfile(
        filePath: string,
        folderPath: string
    ) {
        const result = await cloudinary.uploader.upload(
            filePath,
            {
                resource_type: "auto",
                use_filename: true,
                overwrite: true,
                unique_filename: false,
                folder: `chat-app/${folderPath}`
            }
        )

        return result.url
    }
}
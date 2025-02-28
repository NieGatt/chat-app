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

    async cleanFiles() {
        let videos: string[] = []
        let images: string[] = []

        for (const type of ["image", "video"]) {
            const { resources } = await cloudinary.api.resources({
                type: 'upload',
                prefix: "chat-app",
                resource_type: type
            });

            if (resources.length === 0) continue;

            resources.map((file: { resource_type: string, public_id: string }) => {
                if (file.resource_type === "image") images.push(file.public_id);
                else videos.push(file.public_id)
            })

            if (images.length) await cloudinary.api.delete_resources(images, { resource_type: "image" })
            if (videos.length) await cloudinary.api.delete_resources(videos, { resource_type: "video" })
        }
    }
}
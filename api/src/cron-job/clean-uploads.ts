import cron from "node-cron"
import { CloudinaryHandler } from "../utils/fileUploads/CloudinaryHandler";
import { prisma } from "../utils/prisma"

cron.schedule('0 0 1 * *', async () => {
    const a = new CloudinaryHandler()
    await a.cleanFiles()
    await prisma.user.deleteMany()
});
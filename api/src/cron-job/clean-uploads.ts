import cron from "node-cron"
import { CloudinaryHandler } from "../utils/fileUploads/CloudinaryHandler";

cron.schedule('0 0 1 * *', () => {
    const a = new CloudinaryHandler()
    a.cleanFiles()
});
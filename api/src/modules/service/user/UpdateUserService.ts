import { prisma } from "../../../utils/other/prisma";
import { CloudinaryHandler } from "../../../utils/fileUploads/CloudinaryHandler";
import * as fs from "fs";
import * as path from "path";

export const UpdateUserService = async (
    id: string,
    name: string,
    filePath?: string
) => {
    console.log(filePath)
}
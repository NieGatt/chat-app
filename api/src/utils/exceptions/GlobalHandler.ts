import { ExceptionHandler } from "./ExceptionHandler";
import { Response, Request, NextFunction } from "express";
import multer from "multer";

export const GlobalHandler = (
    error: ExceptionHandler | multer.MulterError | Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let statusCode = 500
    let message = "Internal server error"

    if (error instanceof ExceptionHandler) {
        statusCode = error.statusCode
        message = error.message
    }

    if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            statusCode = 400;
            message = "File exceeded the maximum size";
        } else if (error.code === "LIMIT_UNEXPECTED_FILE") {
            statusCode = 400;
            message = "Unexpected file field";
        } else {
            statusCode = 400;
            message = "Error while uploading file";
        }
    }

    if (statusCode === 500) console.log(error)

    res.status(statusCode).json({
        message,
        statusCode,
        timestamp: new Date().toISOString()
    });
}
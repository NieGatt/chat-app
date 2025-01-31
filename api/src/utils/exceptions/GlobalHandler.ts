import { ExceptionHandler } from "./ExceptionHandler";
import { Response, Request, NextFunction } from "express";

export const GlobalHandler = (
    error: ExceptionHandler | Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const statusCode = error instanceof ExceptionHandler
        ? error.statusCode
        : 500

    const message = statusCode === 500
        ? "Internal server error"
        : error.message

    if (statusCode === 500) console.log(error)

    res.status(statusCode).json({
        message,
        statusCode,
        timestamp: new Date().toISOString()
    });
}
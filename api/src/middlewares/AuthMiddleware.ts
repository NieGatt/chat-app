import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { Unauthorized } from "../utils/exceptions/ExceptionHandler";
import { JwtTokenHandler } from "../utils/other/JwtTokenHandler";

export const AuthMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const secret = process.env.VERIFICATION_SECRET!
    const jwtTokenHandler = new JwtTokenHandler();

    const headers = req.headers.authorization
    if (!headers) return next(new Unauthorized("Authorization header is missing"));

    const verificationToken = headers.split(" ")[1]
    if (!verificationToken) return next(new Unauthorized("Verification token is missing"))

    try {
        const { sub } = jwtTokenHandler.verifyToken(verificationToken, secret) as { sub: string }

        req.user = { id: sub }
        next();
    } catch (error) {
        return next(new Unauthorized("Verification failed"));
    }
};
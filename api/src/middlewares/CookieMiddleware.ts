import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { Unauthorized } from "../utils/exceptions/ExceptionHandler";
import { prisma } from "../utils/other/prisma";
import { JwtTokenHandler } from "../utils/other/JwtTokenHandler";

export const CookieMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const secret = process.env.ACCESSTOKEN_SECRET!
    const jwtTokenHandler = new JwtTokenHandler();

    const accessToken = req.cookies["Authorization"];

    if (!accessToken) 
        return next(new Unauthorized("Authorization cookie is missing"));

    try {
        const decoded = jwtTokenHandler.verifyToken(accessToken, secret) as { sub: string }
        const user = await prisma.user.findUnique({ where: { id: decoded.sub } })

        if (!user?.verified)
            return next(new Unauthorized("User not verificed in the system"))

        if (!user.refreshToken)
            return next(new Unauthorized("User is logged out"));

        req.user = { id: decoded.sub }

        next();
    } catch (error) {
        return next(new Unauthorized("Authorization token is invalid"));
    }
};
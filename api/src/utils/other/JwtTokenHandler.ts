import "dotenv/config";
import jwt from "jsonwebtoken";
import { Unauthorized } from "../exceptions/ExceptionHandler";

export class JwtTokenHandler {
    private accessTokenSecret = process.env.ACCESSTOKEN_SECRET!
    private verificationSecret = process.env.VERIFICATION_SECRET!
    private refreshSecret = process.env.REFRESH_SECRET!


    accessToken(id: string) {
        return jwt.sign({
            sub: id,
            date: new Date(),
        }, this.accessTokenSecret, {
            expiresIn: "30m"
        })
    }

    verificationToken(id: string) {
        return jwt.sign({
            sub: id,
        }, this.verificationSecret, {
            expiresIn: "7d"
        })
    }

    refreshToken(id: string) {
        return jwt.sign({
            sub: id,
        }, this.refreshSecret, {
            expiresIn: "10h"
        })
    }

    verifyToken(token: string, secret: string) {
        try {
            return jwt.verify(token, secret);
        } catch (error) {
            throw new Unauthorized("Jwt token is invalid");
        }
    }
}
import "dotenv/config";
import jwt from "jsonwebtoken";

export class JwtTokenHandler {
    private readonly accessSTecret: string
    private readonly refreshTSecret: string
    private readonly verificationTSecret: string

    constructor() {
        this.accessSTecret = process.env.ACCESSTOKEN_SECRET ?? ""
        this.refreshTSecret = process.env.VERIFICATION_SECRET ?? ""
        this.verificationTSecret = process.env.REFRESH_SECRET ?? ""

        if (!this.accessSTecret || !this.verificationTSecret || !this.refreshTSecret)
            throw new Error("Unable to grant token due to misconfiguration issues")
    }

    verifyAccessToken(token: string) {
        return jwt.verify(token, this.accessSTecret);
    }

    accessToken(id: string) {
        return jwt.sign({
            sub: id,
            createdAt: new Date(),
        }, this.accessSTecret, {
            expiresIn: "30m"
        })
    }

    verifyVerificationToken(token: string) {
        return jwt.verify(token, this.verificationTSecret);
    }

    verificationToken(id: string) {
        return jwt.sign({
            sub: id,
        }, this.verificationTSecret, {
            expiresIn: "7d"
        })
    }

    verifyRefreshToken(token: string) {
        return jwt.verify(token, this.refreshTSecret);
    }

    refreshToken(id: string) {
        return jwt.sign({
            sub: id,
        }, this.refreshTSecret, {
            expiresIn: "10h"
        })
    }

    docodeAnyToken(token: string) {
        return jwt.decode(token)
    }
}
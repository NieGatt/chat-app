import "dotenv/config";
import jwt from "jsonwebtoken";

export class JwtTokenHandler {
    private static readonly accessSTecret = process.env.ACCESSTOKEN_SECRET ?? "";
    private static readonly refreshTSecret = process.env.REFRESH_SECRET ?? "";
    private static readonly verificationTSecret = process.env.VERIFICATION_SECRET ?? "";

    static {
        if (!this.accessSTecret || !this.verificationTSecret || !this.refreshTSecret) {
            throw new Error("Unable to grant token due to misconfiguration issues");
        }
    }

    static verifyAccessToken(token: string) {
        return jwt.verify(token, this.accessSTecret);
    }

    static accessToken(id: string) {
        return jwt.sign({ sub: id, createdAt: new Date() }, this.accessSTecret, { expiresIn: "30m" });
    }

    static verifyVerificationToken(token: string) {
        return jwt.verify(token, this.verificationTSecret);
    }

    static verificationToken(id: string) {
        return jwt.sign({ sub: id }, this.verificationTSecret, { expiresIn: "7d" });
    }

    static verifyRefreshToken(token: string) {
        return jwt.verify(token, this.refreshTSecret);
    }

    static refreshToken(id: string) {
        return jwt.sign({ sub: id }, this.refreshTSecret, { expiresIn: "10h" });
    }

    static decodeAnyToken(token: string) {
        return jwt.decode(token);
    }
}
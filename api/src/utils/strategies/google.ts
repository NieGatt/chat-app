import { Strategy } from "passport-google-oauth20";
import passport from "passport";
import "dotenv/config";
import { BadRequest } from "../exceptions/ExceptionHandler";

passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_REDIRECT_URL!,
    scope: ['profile', 'email']
}, (accessToken, refreshToken, profile, done) => {
    const { emails, name, photos } = profile

    if (emails === undefined || emails.length === 0) {
        return done(new BadRequest("Email is required."));
    }

    const data = {
        name: `${name?.givenName} ${name?.familyName}`,
        email: emails?.[0]?.value,
        pictureUrl: photos?.[0].value
    }
    return done(null, data)
}))
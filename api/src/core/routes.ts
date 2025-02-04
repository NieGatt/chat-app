import "../utils/strategies/google";
import { RegisterController } from "../modules/controller/auth/RegisterController";
import { LoginController } from "../modules/controller/auth/LoginController";
import { LogoutController } from "../modules/controller/auth/LogoutController";
import { ResetPassController } from "../modules/controller/auth/ResetPassController";
import { GoogleLoginController } from "../modules/controller/auth/GoogleLoginController";
import { ValidateController } from "../modules/controller/auth/ValidateController";
import { SendVerificationController } from "../modules/controller/auth/SendVerificationController";
import { CookieMiddleware } from "../middlewares/CookieMiddleware";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { strictLimiterMiddleware, standardLimiterMiddleware } from "../middlewares/LimiterMiddleware";
import { ValidationDataMiddleware } from "../middlewares/ValidationDataMiddleware";
import { fieldsSchema } from "../schemas/FieldsSchema";
import { ReadUserDataController } from "../modules/controller/user/ReadUserDataControlelr";
import { UserResetPassController } from "../modules/controller/user/UserResetPassController";
import { UploadMiddleware } from "../middlewares/UploadMiddleware";

import passport from "passport";
import express from "express";
import { UpdateUserController } from "../modules/controller/user/UpdateUserController";

const router = express.Router();

const ProfileUpload = UploadMiddleware(
    10 * 1024 * 1024, ["image/png", "image/jpeg", "image/jpg"]
)

router.post("/register",
    strictLimiterMiddleware,
    ValidationDataMiddleware(fieldsSchema.pick({
        email: true,
        name: true,
        password: true
    })),
    RegisterController
)

router.post("/login",
    strictLimiterMiddleware,
    ValidationDataMiddleware(fieldsSchema.pick({ email: true, password: true })),
    LoginController
)

router.post("/logout",
    strictLimiterMiddleware, CookieMiddleware, LogoutController
)

router.get("/google/auth",
    strictLimiterMiddleware,
    passport.authenticate("google", { scope: ["profile", "email"], session: false })
)

router.get("/google/redirect",
    strictLimiterMiddleware,
    passport.authenticate("google", { failureRedirect: "/sign-in", session: false }),
    GoogleLoginController
)

router.put("/validate",
    strictLimiterMiddleware, AuthMiddleware, ValidateController
)

router.post("/send-verification/:template(email-verification|forgot-password)",
    strictLimiterMiddleware,
    ValidationDataMiddleware(fieldsSchema.pick({ email: true })),
    SendVerificationController
)

router.put("/reset-password",
    strictLimiterMiddleware,
    AuthMiddleware,
    ValidationDataMiddleware(fieldsSchema.pick({ password: true })),
    ResetPassController
)

router.get("/user",
    standardLimiterMiddleware, CookieMiddleware, ReadUserDataController
)

router.put("/user/reset-password",
    strictLimiterMiddleware, CookieMiddleware, UserResetPassController
)

router.put("/user",
    strictLimiterMiddleware, CookieMiddleware, ProfileUpload,
    ValidationDataMiddleware(fieldsSchema.pick({ name: true })),
    UpdateUserController
)


export { router };
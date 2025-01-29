import "../utils/strategies/google";
import { RegisterController } from "../modules/controller/RegisterController";
import { LoginController } from "../modules/controller/LoginController";
import { LogoutController } from "../modules/controller/LogoutController";
import { ChangePassController } from "../modules/controller/ChangePassController";
import { GoogleLoginController } from "../modules/controller/GoogleLoginController";
import { ValidateController } from "../modules/controller/ValidateController";
import { SendVerificationController } from "../modules/controller/SendVerificationController";
import { CookieMiddleware } from "../middlewares/CookieMiddleware";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { strictLimiterMiddleware, standardLimiterMiddleware } from "../middlewares/LimiterMiddleware";
import { ValidationDataMiddleware } from "../middlewares/ValidationDataMiddleware";
import { fieldsSchema } from "../schemas/FieldsSchema";

import passport from "passport";
import express from "express";
import { ReadUserDataController } from "../modules/controller/ReadUserDataControlelr";

const router = express.Router();

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
    passport.authenticate("google", { failureRedirect: "/login", session: false }),
    GoogleLoginController
)

router.put("/validate",
    strictLimiterMiddleware, AuthMiddleware, ValidateController
)

router.post("/send-verification/:template(EmailVerification|PasswordReset)",
    strictLimiterMiddleware,
    ValidationDataMiddleware(fieldsSchema.pick({ email: true })),
    SendVerificationController
)

router.put("/change-password",
    strictLimiterMiddleware,
    AuthMiddleware,
    ValidationDataMiddleware(fieldsSchema.pick({ password: true })),
    ChangePassController
)

router.get("/user",
    standardLimiterMiddleware, CookieMiddleware, ReadUserDataController
)

export { router };
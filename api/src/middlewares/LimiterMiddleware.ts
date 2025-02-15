import { rateLimit } from "express-rate-limit";
import { Response, Request } from "express";

const LimiterMiddleware = (req: Request, res: Response) => {
    res.status(429).json({
        success: false,
        statusCode: 429,
        message: "Too many request. Please try again later",
        timestamp: new Date().toISOString()
    })
}

const standardLimiterMiddleware = rateLimit({
    limit: 80,
    windowMs: 10 * 60 * 1000,
    handler: LimiterMiddleware
})

const strictLimiterMiddleware = rateLimit({
    limit: 20,
    windowMs: 10 * 60 * 1000,
    handler: LimiterMiddleware
})

export { standardLimiterMiddleware, strictLimiterMiddleware };
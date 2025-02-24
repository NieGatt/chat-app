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
    limit: 100,
    windowMs: 10 * 60 * 1000,
    handler: LimiterMiddleware
})

const strictLimiterMiddleware = rateLimit({
    limit: 40,
    windowMs: 12 * 60 * 1000,
    handler: LimiterMiddleware
})

const chatWritesLimiterMiddleware = rateLimit({
    limit: 10,
    windowMs: 1000,
    handler: LimiterMiddleware
})

export { standardLimiterMiddleware, strictLimiterMiddleware, chatWritesLimiterMiddleware };
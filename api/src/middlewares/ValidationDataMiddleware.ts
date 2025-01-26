import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { BadRequest } from "../utils/exceptions/ExceptionHandler";

export const ValidationDataMiddleware = (schema: Zod.ZodTypeAny) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                const errorsObj = error.errors.map(issue => issue.message);
                const message = errorsObj.join(", ");
                return next(new BadRequest(message));
            }
        }
    };
}
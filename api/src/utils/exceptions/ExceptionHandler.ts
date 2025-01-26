export class ExceptionHandler extends Error {
    statusCode: number
    constructor(statusCode: number, message: string) {
        super(message)
        this.statusCode = statusCode
    }
}

export class BadRequest extends ExceptionHandler {
    constructor(message: string) {
        super(400, message)
    }
}

export class Unauthorized extends ExceptionHandler {
    constructor(message: string) {
        super(401, message)
    }
}

export class Forbidden extends ExceptionHandler {
    constructor(message: string) {
        super(401, message)
    }
}

export class NotFound extends ExceptionHandler {
    constructor(message: string) {
        super(404, message)
    }
}

export class Conflict extends ExceptionHandler {
    constructor(message: string) {
        super(409, message)
    }
}
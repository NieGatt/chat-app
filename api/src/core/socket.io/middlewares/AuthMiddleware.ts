import { Socket } from "socket.io"
import cookieParser from "cookie-parser"

export const AuthMiddleware = (socket: Socket, next: any) => {
    const cookies = socket.request.headers.cookie ?? ''
    const parse = cookieParser.JSONCookie(cookies)

    console.log(parse)
    next()
}
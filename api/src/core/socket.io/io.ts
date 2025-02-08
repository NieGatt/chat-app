import { io } from "..";
import { strictLimiterMiddleware } from "../../middlewares/LimiterMiddleware";
import { ChangeMessageStatus } from "./events/ChangeMessageStatus";
import { SendMessage } from "./events/SendMessage";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";

io.engine.use(strictLimiterMiddleware)
io.use(AuthMiddleware)

io.on("connection", (socket => {
    SendMessage(socket, io)
    ChangeMessageStatus(socket, io)
}))
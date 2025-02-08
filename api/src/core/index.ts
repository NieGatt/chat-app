import "dotenv/config";
import "express-async-errors";
import { GlobalHandler } from "../utils/exceptions/GlobalHandler";
import { router } from "./routes";
import cookieParser from "cookie-parser";
import passport from "passport";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(passport.initialize())
app.use(cookieParser())
app.use(express.json())
app.use(router)
app.use(GlobalHandler)

const PORT = Number(process.env.PORT ?? 3000);

const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
})
export { io }
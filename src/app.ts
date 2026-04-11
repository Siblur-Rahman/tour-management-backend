/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response } from "express";
import cors from "cors"
import "./app/config/passport"
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { router } from "./app/routes";
import notFound from "./app/middlewares/notfound";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session"

const app = express();
app.use(expressSession({
    secret: "Your secret",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())

app.use(express.json())

app.use(cors())

app.use("/api/v1/", router)

app.get("/", (req: Request, res: Response)=>{
     res.status(200).json({
        message: "wellcome to Tour Management System Backend"
    })
}
)

app.use(globalErrorHandler)

app.use(notFound)

export default app;
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response } from "express";
import { UserRoutes } from "./app/modules/user/user.route";
import cors from "cors"
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";

const app = express();

app.use(express.json())

app.use(cors())

app.use("/api/v1/user", UserRoutes)

app.get("/", (req: Request, res: Response)=>{
     res.status(200).json({
        message: "wellcome to Tour Management System Backend"
    })
}
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(globalErrorHandler)

export default app;
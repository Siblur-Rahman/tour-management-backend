/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response } from "express";
import cors from "cors"
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { router } from "./app/routes";
import notFound from "./app/middlewares/notfound";

const app = express();

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
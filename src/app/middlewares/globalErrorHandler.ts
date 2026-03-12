/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const globalErrorHandler = (err : any, req: Request, res: Response, next: NextFunction)=>{

    const statusCode= 500
    const message =`Something Went Wrong!! ${err.message}`
    res.status(500).json({
        success: false,
         message,
         stack: envVars.NODE_ENV=== "development" ? err.stack : null
    })
}
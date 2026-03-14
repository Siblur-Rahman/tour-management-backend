/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env"
import AppError from "../errorHelpers/AppError"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const globalErrorHandler = (err : any, req: Request, res: Response, next: NextFunction)=>{

    // eslint-disable-next-line prefer-const
    let statusCode= 500
    // eslint-disable-next-line prefer-const
    let message =`Something Went Wrong!!`

    if(err instanceof AppError){
        statusCode = err.statusCode
        message= err.message
    } else if(err instanceof Error){
        statusCode = 500;
        message= err.message
    }
    res.status(500).json({
        success: false,
         message,
         stack: envVars.NODE_ENV=== "development" ? err.stack : null
    })
}
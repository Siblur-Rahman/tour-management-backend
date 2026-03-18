import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync"
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialsLogin = catchAsync( async (req: Request, res: Response, next: NextFunction) =>{
    
        const loginInfo = await AuthServices.credentialsLogin(req.body)

        sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Logged in Successfuly",
        data: loginInfo
       })
})


export const AuthControllers = {
    credentialsLogin
}
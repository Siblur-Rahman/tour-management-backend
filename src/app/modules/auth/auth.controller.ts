/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync"
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"

const credentialsLogin = catchAsync( async (req: Request, res: Response, next: NextFunction) =>{
    
        const loginInfo = await AuthServices.credentialsLogin(req.body)

        sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Logged in Successfuly",
        data: loginInfo
       })
})
const getNewAccessToken = catchAsync( async (req: Request, res: Response, next: NextFunction) =>{

    const refreshToken = req.cookies.refreshToken;
        const tokenInfo = await AuthServices.getNewAccessToken(req.body)

        sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Logged in Successfuly",
        data: tokenInfo
       })
})


export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken
}
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync"
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"
import AppError from "../../errorHelpers/AppError";

const credentialsLogin = catchAsync( async (req: Request, res: Response, next: NextFunction) =>{
    
        const loginInfo = await AuthServices.credentialsLogin(req.body)
        res.cookie("accessToken", loginInfo.accessToken, {
            httpOnly: true,
            secure: false
        })

        res.cookie("refreshToken", loginInfo.refressToken, {
            httpOnly: true,
            secure: false
        })
        sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Logged in Successfuly",
        data: loginInfo
       })
})
const getNewAccessToken = catchAsync( async (req: Request, res: Response, next: NextFunction) =>{

    const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            throw new AppError(httpStatus.BAD_REQUEST, "No refresh token ricieved from cookies")
        }

        const tokenInfo = await AuthServices.getNewAccessToken(refreshToken as string)

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
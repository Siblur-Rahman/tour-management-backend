/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync"
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utils/setCookie";

const credentialsLogin = catchAsync( async (req: Request, res: Response, next: NextFunction) =>{
    
        const loginInfo = await AuthServices.credentialsLogin(req.body)

        // res.cookie("accessToken", loginInfo.accessToken, {
        //     httpOnly: true,
        //     secure: false
        // })



        // res.cookie("refreshToken", loginInfo.refreshToken, {
        //     httpOnly: true,
        //     secure: false
        // })


        setAuthCookie(res, loginInfo)

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

        // res.cookie("accessToken", tokenInfo.accessToken, {
        //     httpOnly: true,
        //     secure: false
        // })
        setAuthCookie(res, tokenInfo)

        sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "New Access Token Retrived Successfuly",
        data: tokenInfo
       })
})
const logout = catchAsync( async (req: Request, res: Response, next: NextFunction) =>{

        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })

        sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Logged Out Successfuly",
        data: null
       })
})


export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken,
    logout
}
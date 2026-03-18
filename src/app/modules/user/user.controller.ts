/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

// const createUser = async(req: Request, res: Response, next: NextFunction) =>{
//     try {
//         const user = await userServices.createUser(req.body)
//         res.status(httpStatus.CREATED).json({
//             message: "User Created Successfuly",
//             user
//         })
//     } catch (err: any) {
//         console.log(err);
//         next(err)
//     }
// }

const createUser = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    
        const user = await userServices.createUser(req.body);

        // res.status(httpStatus.CREATED).json({
        //     message: "User Created Successfuly",
        //     user
        // })
        sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User Created Successfuly",
        data: user
       })
})
const updateUser = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{

       const userId = req.params.id;
       // const token = req.headers.authorization;
       // const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET) as JwtPayload

       const verifiedToken = req.user
       const payload = req.body;
    
        const user = await userServices.updateUser(userId as string, payload, verifiedToken);

        // res.status(httpStatus.CREATED).json({
        //     message: "User Created Successfuly",
        //     user
        // })
        sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User Updated Successfuly",
        data: user
       })
})

const getAllUsers = catchAsync( async (req: Request, res: Response, next: NextFunction) =>{
       
            const result = await userServices.getAllUsers();
            
            // res.status(httpStatus.OK).json({
            //     success: true,
            //     message: "All Users Retrieved Successfully",
            //     data: users
            // })
             sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "All Users Retrieved Successfully",
        data: result.data,
        meta: result.meta
       })
       
})

// const getAllUsers = async (req: Request, res: Response, next: NextFunction) =>{
//         try {
//             const users = await userServices.getAllUsers();
//             res.status(httpStatus.OK).json({
//                 success: true,
//                 message: "All Users Retrieved Successfully",
//                 data: users
//             })
//         } catch (err: any) {
//         console.log(err);
//         next(err)
//     }
// }
export const UserControllers = {
    createUser,
    getAllUsers,
    updateUser
}
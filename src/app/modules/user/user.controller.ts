import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { userServices } from "./user.service";
import AppError from "../../errorHelpers/AppError";

const createUser = async(req: Request, res: Response, next: NextFunction) =>{
    try {
        throw new AppError(httpStatus.BAD_REQUEST, "fake error")
        const user = await userServices.createUser(req.body)
        res.status(httpStatus.CREATED).json({
            message: "User Created Successfuly",
            user
        })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.log(err);
        next(err)
    }
}

export const UserControllers = {
    createUser
}
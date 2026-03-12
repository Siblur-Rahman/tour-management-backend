import { Request, Response } from "express";
import httpStatus from "http-status-codes"
import { userServices } from "./user.service";

const createUser = async(req: Request, res: Response) =>{
    try {

        const user = await userServices.createUser(req.body)
        res.status(httpStatus.CREATED).json({
            message: "User Created Successfuly",
            user
        })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.log(err);
        res.status(httpStatus.BAD_REQUEST).json({
            message: `Something Went Wrong!! ${err.message}`, err
        })
    }
}

export const UserControllers = {
    createUser
}
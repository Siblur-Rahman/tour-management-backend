import AppError from "../../errorHelpers/AppError"
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model"
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"

const credentialsLogin = async (payload: Partial<IUser>) =>{
    const {email, password} = payload;

    const isUserExit = await User.findOne({email})

    if(!isUserExit){
        throw new AppError(httpStatus.BAD_REQUEST, "User does npt Exist")
    }

    const isPasswordMatched = await bcryptjs.compare(password as string, isUserExit.password as string)

    if(!isPasswordMatched){
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
    }

    return {
        email: isUserExit.email
    } 
}


export const AuthServices = {
    credentialsLogin
}
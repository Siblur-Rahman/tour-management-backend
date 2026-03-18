import AppError from "../../errorHelpers/AppError"
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model"
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"
import { generateToken } from "../../utils/jwt"
import { envVars } from "../../config/env"

const credentialsLogin = async (payload: Partial<IUser>) =>{
    const {email, password} = payload;

    const isUserExit = await User.findOne({email})

    if(!isUserExit){
        throw new AppError(httpStatus.BAD_REQUEST, "User does Exist")
    }

    const isPasswordMatched = await bcryptjs.compare(password as string, isUserExit.password as string)

    if(!isPasswordMatched){
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
    }


    const jwtPayload ={
        userId: isUserExit._id,
        email: isUserExit.email,
        role: isUserExit.role
    }

    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)
    return {
        // email: isUserExit.email
        accessToken
    } 
}


export const AuthServices = {
    credentialsLogin
}
import AppError from "../../errorHelpers/AppError"
import { IsActive, IUser } from "../user/user.interface"
import { User } from "../user/user.model"
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"

import { createUserToken } from "../../utils/userToken"
import { generateToken, verifyToken } from "../../utils/jwt"
import { envVars } from "../../config/env"
import { JwtPayload } from "jsonwebtoken"

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


    // const jwtPayload ={
    //     userId: isUserExit._id,
    //     email: isUserExit.email,
    //     role: isUserExit.role
    // }

    // const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)

    // const refressToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)

    const userToken = createUserToken(isUserExit)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password : pass, ...rest} = isUserExit.toObject()

    // delete isUserExit.password // for remove password field from data
    return {
        // email: isUserExit.email
        accessToken : userToken.accessToken,
        refressToken : userToken.refressToken,
        user: rest
    } 
}
const getNewAccessToken = async (refressToken: string) =>{
    const verifiedRefreshToken = verifyToken(refressToken, envVars.JWT_REFRESH_SECRET) as JwtPayload

    const isUserExit = await User.findOne({email : verifiedRefreshToken.email})

    if(!isUserExit){
        throw new AppError(httpStatus.BAD_REQUEST, "User does not Exist")
    }

     if(isUserExit.isActive === IsActive.BLOCKED || isUserExit.isActive === IsActive.INACTIVE){
        throw new AppError(httpStatus.BAD_REQUEST, `User is  ${isUserExit.isActive}`)
    }
    if(isUserExit.isDeleted){
        throw new AppError(httpStatus.BAD_REQUEST, "User is Deleted")
    }


    const jwtPayload ={
        userId: isUserExit._id,
        email: isUserExit.email,
        role: isUserExit.role
    }

    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)


    return {
        accessToken
    } 
}


export const AuthServices = {
    credentialsLogin,
    getNewAccessToken
}
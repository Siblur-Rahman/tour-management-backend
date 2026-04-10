/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppError from "../../errorHelpers/AppError"
import { User } from "../user/user.model"
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"

import { createNewAccessTokenWithRefreshToken, createUserToken } from "../../utils/userToken"
import { IUser } from "../user/user.interface"
import { JwtPayload } from "jsonwebtoken"
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


    // const jwtPayload ={
    //     userId: isUserExit._id,
    //     email: isUserExit.email,
    //     role: isUserExit.role
    // }

    // const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)

    // const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)

    const userToken = createUserToken(isUserExit)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password : pass, ...rest} = isUserExit.toObject()

    // delete isUserExit.password // for remove password field from data
    return {
        // email: isUserExit.email
        accessToken : userToken.accessToken,
        refreshToken : userToken.refreshToken,
        user: rest
    } 
}
const getNewAccessToken = async (refreshToken: string) =>{
    // const verifiedRefreshToken = verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET) as JwtPayload

    // const isUserExit = await User.findOne({email : verifiedRefreshToken.email})

    // if(!isUserExit){
    //     throw new AppError(httpStatus.BAD_REQUEST, "User does not Exist")
    // }

    //  if(isUserExit.isActive === IsActive.BLOCKED || isUserExit.isActive === IsActive.INACTIVE){
    //     throw new AppError(httpStatus.BAD_REQUEST, `User is  ${isUserExit.isActive}`)
    // }
    // if(isUserExit.isDeleted){
    //     throw new AppError(httpStatus.BAD_REQUEST, "User is Deleted")
    // }


    // const jwtPayload ={
    //     userId: isUserExit._id,
    //     email: isUserExit.email,
    //     role: isUserExit.role
    // }

    // const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)


    // return {
    //     accessToken
    // } 

    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)
    
        return {
        accessToken : newAccessToken
    } 

}
const resetPassword = async ( oldPassword : string, newPassword: string, decodedToken : JwtPayload) =>{

    const user = await User.findById(decodedToken.userId)

    const isOldPasswordMatched =  await bcryptjs.compare(oldPassword, user!.password as string)

    if(!isOldPasswordMatched){
        throw new AppError(httpStatus.UNAUTHORIZED,"Old Password does not Matched")
    }

    user!.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))

    user!.save()
}


export const AuthServices = {
    credentialsLogin,
    getNewAccessToken, 
    resetPassword
}
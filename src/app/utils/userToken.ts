import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { IsActive, IUser } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { generateToken, verifyToken } from "./jwt";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken"



export const createUserToken = (user : Partial<IUser>) =>{
     const jwtPayload ={
        userId: user._id,
        email: user.email,
        role: user.role
    }

    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)

    const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)
        return {
        // email: isUserExit.email
        accessToken,
        refreshToken,
    } 
}

export const createNewAccessTokenWithRefreshToken = async ( refreshToken: string)=>{
 const verifiedRefreshToken = verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET) as JwtPayload

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


    return accessToken 
}
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { envVars } from "../config/env";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import httpStatus from "http-status-codes"
import { IsActive } from "../modules/user/user.interface";

export const checkAuth = (...authRoles: string[]) =>  async (req: Request, res: Response, next: NextFunction)=>{
   try {
     const accessToken = req.headers.authorization;

     if(!accessToken){
        throw new AppError(403, "No Token Recieved")
     }
     
     const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload
   //   const verifiedToken = jwt.verify(accessToken, "secret")

    const isUserExit = await User.findOne({email : verifiedToken.email})

    if(!isUserExit){
        throw new AppError(httpStatus.BAD_REQUEST, "User does not Exist")
    }

     if(isUserExit.isActive === IsActive.BLOCKED || isUserExit.isActive === IsActive.INACTIVE){
        throw new AppError(httpStatus.BAD_REQUEST, `User is  ${isUserExit.isActive}`)
    }
    if(isUserExit.isDeleted){
        throw new AppError(httpStatus.BAD_REQUEST, "User is Deleted")
    }
     
     if(!authRoles.includes(verifiedToken.role)){
        throw new AppError(403, "You are not permited to view this route!!!")
     }

     req.user= verifiedToken
    next()
   } catch (err) {
    next(err)
   }
};
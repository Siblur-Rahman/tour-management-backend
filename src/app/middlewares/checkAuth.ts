import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { envVars } from "../config/env";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth = (...authes: string[]) =>  async (req: Request, res: Response, next: NextFunction)=>{
   try {
     const accessToken = req.headers.authorization;

     if(!accessToken){
        throw new AppError(403, "No Token Recieved")
     }
     
     const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload
   //   const verifiedToken = jwt.verify(accessToken, "secret")
     
     if(!authes.includes(verifiedToken.role)){
        throw new AppError(403, "You are not permited to view this route!!!")
     }

     req.user= verifyToken
    next()
   } catch (err) {
    next(err)
   }
};
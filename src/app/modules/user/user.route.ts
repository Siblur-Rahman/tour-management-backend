import { NextFunction, Request, Response } from "express";
import { Router } from "express";
import { UserControllers } from "./user.controller";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { Role } from "./user.interface";
// import { createUserZodSchema } from "./user.validation";
// import { validateRequest } from "../../middlewares/validateRequest";





const router = Router()

router.post("/register", 
    // validateRequest(createUserZodSchema), 
    UserControllers.createUser);

router.get("/all-users", async (req: Request, res: Response, next: NextFunction)=>{
   try {
     const accessToken = req.headers.authorization;
     if(!accessToken){
        throw new AppError(403, "No Token Recieved")
     }
     
     const veryfiedToken = jwt.verify(accessToken, "secret")
     
     if((veryfiedToken as JwtPayload ).role !== Role.ADMIN){
        throw new AppError(403, "You are not permited to view this route")
     }
    next()
   } catch (err) {
    next(err)
   }
}, UserControllers.getAllUsers)

export const UserRoutes = router

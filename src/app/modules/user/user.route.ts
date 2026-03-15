import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import z from "zod";


const router = Router()

router.post("/register",
    async (req: Request, res: Response, next: NextFunction)=>{
    const createUserZodSchema = z.object({
    name: z
        .string({error: "Name must be string"})
        .min(2, {message: "Name too short. Minimum 2 character long"})
        .max(50, {message: "Name too long"}),
    email: z
        .string({error: "Email must be string"})
        .min(5, {message: "Email too short. Minimum 5 character long"})
        .max(100, {message: "Email cannot exceed 100 characters"}),
    password : z
        .string().min(8).regex(/^(?=.*[A-Z])/, {message: "Password must contain at least 1 uppercase letter"})
        .regex(/^(?=.*[!@#$%^&*])/, {message: "Password must contain at least 1 special charactewr"})
        .regex(/^(?=.*\d)/, {message: "Password must contain at least 1 number"}),
    phone: z
        .string({error: "Phone Number must be string"})
        .regex(/^(?:\+8801\d{9} |01\d{9})$/, {
            message: "Phone number must be valid for Bangladesh. Format : +18801XXXXXXXX or 01XXXXXXX"
        }). optional(),
    address: z
        .string({error: "Address must be string"})
        .max(200, {message: "Address cannot exceed 100 characters"})
        .optional(),
    
    });
    req.body = await createUserZodSchema.parseAsync(req.body)
    next()
}, UserControllers.createUser);
router.get("/all-users", UserControllers.getAllUsers)

export const UserRoutes = router

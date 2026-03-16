import { Router } from "express";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";





const router = Router()



router.post("/register", 
    validateRequest(createUserZodSchema), 
    UserControllers.createUser);

router.get("/all-users", 

checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
UserControllers.getAllUsers)

export const UserRoutes = router

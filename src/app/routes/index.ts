import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";

export const router = Router()

const moduleRoute = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    }
]

moduleRoute.forEach((route) =>{
    router.use(route.path, route.route)
})
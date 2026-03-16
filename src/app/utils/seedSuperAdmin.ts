import { envVars } from "../config/env"
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface"
import { User } from "../modules/user/user.model"
import bycryptjs from "bcryptjs"

export const seedSuperAdmon= async () =>{
    try {
        const isSuperAdmin = await User.findOne({email: envVars.SUPER_ADMIN_EMAIL})
        if(isSuperAdmin){
            console.log("Super Admin Exists");
            return 
        }

        console.log("Trying to create super admin");
        const hashedPassword = await bycryptjs.hash(envVars.SUPER_ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUND))

        const authProvider : IAuthProvider ={
            provider: "credentials",
            providerId: envVars.SUPER_ADMIN_EMAIL
        }

        const paload: IUser ={
            name: "Super admin",
            role : Role.SUPER_ADMIN,
            email : envVars.SUPER_ADMIN_EMAIL,
            password : hashedPassword,
            isVerified: true,
            auths: [authProvider]
        }

        const superadmin = await User.create(paload)
        console.log(superadmin);
    } catch (err) {
        console.log(err);
    }
    // 11:07
}
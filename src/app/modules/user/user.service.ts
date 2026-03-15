import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes"


const createUser= async(payload: Partial<IUser>)=>{
        const {email, ...res} = payload;

        const isUserExit = await User.findOne({email})

        if(isUserExit){
            throw new AppError(httpStatus.BAD_REQUEST, "User Allready Exit")
        }

        const authProvider : IAuthProvider = {provider: "credentials", providerId: email as string}
        const user = await User.create({
            email,
            ...res
        })
    return user
}

const getAllUsers = async() =>{
    const users = await User.find({});

    // const totalUsers = users.length
    const totalUsers = await User.countDocuments()

    return {
        data: users,
        meta: {
            total: totalUsers
        }
    }
}

export const userServices = {
    createUser,
    getAllUsers
}
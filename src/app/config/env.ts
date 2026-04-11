/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from "dotenv"
dotenv.config()

interface EnvConfig{
    PORT: string,
    DB_URL: string,
    NODE_ENV: "development" | "production",
    BCRYPT_SALT_ROUND: string,
    JWT_ACCESS_SECRET: string,
    JWT_ACCESS_EXPIRES: string,
    JWT_REFRESH_EXPIRES: string,
    JWT_REFRESH_SECRET: string,
    SUPER_ADMIN_EMAIL : string,
    SUPER_ADMIN_PASSWORD: string,
    GOOGLE_CLIENT_SECRET: string,
    GOOGLE_CLIENT_ID: string,
    GOOGLE_CALLBACK_URL: string,
    EXPRESS_SESSION_SECRET: string,
    FRONTED_URL: string

}

const loadEnvVariables=(): EnvConfig =>{
    const requiredEnvVariables: string[] = ["PORT", "DB_URL", "NODE_ENV","BCRYPT_SALT_ROUND", "JWT_ACCESS_SECRET", "JWT_ACCESS_EXPIRES","SUPER_ADMIN_EMAIL", "SUPER_ADMIN_PASSWORD","JWT_REFRESH_SECRET","JWT_REFRESH_EXPIRES", "GOOGLE_CLIENT_SECRET","GOOGLE_CLIENT_ID","GOOGLE_CALLBACK_URL","EXPRESS_SESSION_SECRET","FRONTED_URL"];

    requiredEnvVariables.forEach(key=>{
        if(!process.env[key]){
            throw new Error(`Missing require environment variable  ${key}`)
        }
    })
    
    return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL!,
    NODE_ENV: process.env.NODE_ENV as "development"| "production",
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND!,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES!,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES!,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
    SUPER_ADMIN_EMAIL : process.env.SUPER_ADMIN_EMAIL!,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD!,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL!,
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET!,
    FRONTED_URL: process.env.FRONTED_URL!


}
}
export const envVars = loadEnvVariables();
// 7:43
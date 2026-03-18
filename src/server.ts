/* eslint-disable no-console */
import {Server} from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmon } from "./app/utils/seedSuperAdmin";




let server : Server;


const startServer = async()=>{
    try {
        await mongoose.connect(envVars.DB_URL)
        console.log("connected to DB!");
        server = app.listen(5000, ()=>{
            console.log("server is running on port 5000");
        })
    } catch (error) {
        console.log(error);
    }
}

(async()=>{
await startServer();
await seedSuperAdmon()
})()

process.on("SIGTERM", ()=>{
    console.log("SIGTERM signal recieved... detected... Server shutting down..");

    if(server){
        server.close(()=>{
            process.exit(1)
        });
    }
    process.exit(1)
});
process.on("SIGINT", ()=>{
    console.log("SIGINT signal recieved... detected... Server shutting down..");

    if(server){
        server.close(()=>{
            process.exit(1)
        });
    }
    process.exit(1)
});
// Checking for unhandledRejection
process.on("unhandledRejection", (err)=>{
    console.log("Unhandled Rejection detected... Server shutting down..", err);

    if(server){
        server.close(()=>{
            process.exit(1)
        });
    }
    process.exit(1)
});
// Checking for unhandledRejection
// Promise.reject(new Error("I forgot to catch this promise"))
process.on("uncaughtException", (err)=>{
    console.log("Uncaught Exception detected... Server shutting down..", err);

    if(server){
        server.close(()=>{
            process.exit(1)
        });
    }
    process.exit(1)
})

// Checking for UncaughtException
// throw new Error("I forgot to handle this local erro")




 import express from "express"
 import dotenv from "dotenv"
import products from "./Routers/Products.js"
import cors from "cors"
import connection from "./db/db.js"
import userRouter from "./Routers/User.js"
import cookieParser from "cookie-parser";
 dotenv.config()
 connection(process.env.mongodb_uri)
 const app= express()
 app.use(cors())
 app.use(cookieParser())
app.use(express.json())
app.use("/products", products)
app.use("/user", userRouter)
 app.listen(process.env.PORT, ()=>{
    console.log("server startedy");
    
 })
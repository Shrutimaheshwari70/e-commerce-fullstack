 import express from "express"
 import dotenv from "dotenv"

import cors from "cors"
import connection from "./db/db.js"
import userRouter from "./Routers/User.js"
import cookieParser from "cookie-parser";
import productsRouter from "./Routers/Products.js"
 dotenv.config()
 connection(process.env.mongodb_uri)
 const app= express()
 app.use(cors({
  origin: "http://localhost:5173",
  //allowing only my frontend 
  credentials: true
}))
 app.use(cookieParser())
app.use(express.json())
app.use("/products", productsRouter)
app.use("/user", userRouter)
 app.listen(process.env.PORT, ()=>{
    console.log("server started");
    
 }) 
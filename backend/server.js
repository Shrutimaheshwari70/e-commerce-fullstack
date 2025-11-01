 import express from "express"
 import dotenv from "dotenv"

import cors from "cors"
import connection from "./db/db.js"
import userRouter from "./Routers/User.js"
import cookieParser from "cookie-parser";
import productsRouter from "./Routers/Products.js"
import cartRouter from "./Routers/Cart.js"
import orderRouter from "./Routers/Order.js"
import addressRouter from "./Routers/Address.js"
import otpRouter from "./Routers/Otp.js"
 dotenv.config()
 

 
 connection(process.env.mongodb_uri)
 const app= express()
 app.use(cors())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});


 app.use(cookieParser())
app.use(express.json())
app.use("/products", productsRouter)
app.use("/user", userRouter)
app.use("/cart", cartRouter)
app.use("/order", orderRouter)
app.use("/address", addressRouter)
app.use("/otp", otpRouter)
 app.listen(process.env.PORT, ()=>{
    console.log("server started");
    
 }) 
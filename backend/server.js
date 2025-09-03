 import express from "express"
 import dotenv from "dotenv"
import products from "./Routers/Products.js"
import cors from "cors"
 dotenv.config()
 const app= express()
 app.use(cors())
app.use(express.json())
app.use("/products", products)
 app.listen(process.env.PORT, ()=>{
    console.log("server startedy");
    
 })
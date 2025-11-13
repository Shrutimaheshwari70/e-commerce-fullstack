import { Router } from "express";
import { addOrder, getOrder } from "../Controllers/Order.js";
import authMiddleware from "../middlewares/authmiddleware.js";

 const orderRouter= Router()

 orderRouter.get("/getOrder",authMiddleware, getOrder)
 orderRouter.post("/addOrder",authMiddleware, addOrder)

 export default orderRouter 
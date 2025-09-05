import { Router } from "express";
import { getProfile, login, logout, signup } from "../Controllers/User.js";
import password from "../middlewares/passwordVrification.js";

const userRouter= Router()
userRouter.post("/signup",signup )
userRouter.post("/login", password, login)
userRouter.get("/getProfile", getProfile)
userRouter.post("/logout", logout)
export default userRouter;
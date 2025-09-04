import User from "../Schemas/UserSchema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export async function signup(req,res){
const {firstName, lastName,userName,password } = req.body;
try {
    const hashedPassword= await  bcrypt.hash(password, 10)
    const user= new User({
        firstName, lastName,userName,password :hashedPassword
    })
    
     await user.save()
    res.send("new user added ")
} catch (error) {
    res.send("error: " + error)
}
}
export async function login(req,res){
let {user}= req.body
try {
  let token=  await jwt.sign({id: user._id}, process.env.secret_key) 
  res.cookie("token",token).send("loggedin successfully ")
} catch (error) {
   res.send(error) 
}

}

export async function getProfile(req,res){
const token= req.cookies.token
if(!token) res.status(404).send("please login first to continue ")
const decodedUser= jwt.verify(token, process.env.secret_key)
const user=await  User.findById(decodedUser.id).select("-password");
if(!user)return  res.send("invalid token!!")
res.status(200).json({
    user
})
}
import User from "../Schemas/UserSchema.js"
import bcrypt from "bcrypt"
export default async  function password(req,res,next){
const {userName, password}= req.body 
const user = await User.findOne({userName})
if(!user){
    throw new Error("invalid credentials ")
}

try {
    let hashedpassword= user.password
  const isVerified=   bcrypt.compare(password, hashedpassword )
  if(isVerified){
    req.body.user=user; 
  next()
  }
  else{
    throw new Error("invalid credentials")
  }

} catch (error) {
  throw new Error ("server error ")  
}


 }
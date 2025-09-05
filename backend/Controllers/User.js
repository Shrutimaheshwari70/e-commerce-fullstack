import User from "../Schemas/UserSchema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import validator from "validator"
export async function signup(req, res) {
  const { firstName, lastName, userName, password } = req.body;

  try {
    if(!password){
     return res.status(400).json({
        message:
          "Password not added",
      });   
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must be strong (include uppercase, lowercase, number & special char)",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      userName,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "new user added" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


export async function login(req,res){
let {user}= req.body
try {
  let token=  await jwt.sign({id: user._id}, process.env.secret_key, { expiresIn: "1d" }) 
  res.cookie("token",token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false 
  }).json({message:"loggedin successfully "})
} catch (error) {
   res.send(error) 
}

}

export async function getProfile(req,res){
const token= req.cookies.token
console.log(token);

if(!token)return res.status(401).json({message:"please login first to continue "})
const decodedUser= jwt.verify(token, process.env.secret_key)
const user=await  User.findById(decodedUser.id).select("-password");
if(!user)return  res.send("invalid token!!")
res.status(200).json({
    user
})
}

export async function logout(req, res) {
  try {
    
    res.clearCookie("token");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

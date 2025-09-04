import { model, Schema } from "mongoose";
import validator from "validator"
 const UserSchema= new Schema({
    firstName:{
type:String,
required:[true , "name is required"]
    },
    lastName:{
        type:String,
        
    },
    userName:{
        type: String,
         unique:[true,"username already taken"],
         required:[true,"username is required "]
    },
    password:{
        type:String,
        validate(password){
            if(!validator.isStrongPassword(password)) {
                throw new Error("passowrd not strong")
            }

        },
        required: [true, "please enter a password "],
        minLength: [9, "Password must be at least 9 characters long"]
    }
 })

const User=  model("Users", UserSchema)
export default User;
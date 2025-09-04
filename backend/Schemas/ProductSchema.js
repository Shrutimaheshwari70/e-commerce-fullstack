import {model, Schema} from "mongoose" 
 const productSchema= new Schema({
    productName:{
        type:String,
        required:true,
        unique:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    productImage:{
        type:String,
        required:true
    },
    productCount:{
        type:Number,
        required:true
    }

 })

 const products= new model("Products", productSchema)
 export default products
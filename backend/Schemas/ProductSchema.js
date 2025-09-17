import {model, Schema} from "mongoose" 
 const productSchema= new Schema({
    productName:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    productPrice:{
        type:Number,
        required:true,
        min:0
    },
    productImage:{
        type:[String],
        required:true
    },
    productCount:{
        type:Number,
        required:true,
        min:0
    }, 
    productCategory:{
        type:String,
        required:true,
          enum: ["Men", "Women", "Kids"] 
    },
    description:{
        type:String,
        required:true
    }

 },
{
    timestamps:true
})

 const products= new model("Products", productSchema)
 export default products
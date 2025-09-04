import mongoose from "mongoose";

const connection=(uri)=>{
    mongoose.connect(uri)
    .then(()=>{
        console.log("mongodb connected ");
        
    })
}

export default connection
import products from "../Schemas/ProductSchema.js"

export function getProduct(req,res){
    res.send(" got product")
 }

 export async function addProduct(req,res){
    const {productName, productPrice, productImage,productCount}= req.body
    const product= new products({productName, productPrice, productImage,productCount})
   await product.save()
   res.send("new product added ")
 }
import products from "../Schemas/ProductSchema.js"
import fs from "fs";
import cloudinary from "../config/cloudinary.js";

export async function getProduct(req,res){
try {
   const product= await products.find()
   //puri product collection 
   res.status(200).json({
    message:"products found",
    products:product
   })
} catch (error) {
   res.status(500).json({
      error:error
   })
}
 }

 export async function addProduct(req,res){
    console.log(req.files);
    
     try {
    
         let imageUrl = [];
        if(req.files) {
  for(const file of req.files){
    const result = await cloudinary.uploader.upload(file.path, { folder: "uploads" });
    imageUrl.push(result.secure_url);
    fs.unlinkSync(file.path);
  }
}
    const newProduct = new products({
           productName: req.body.productName,
      productPrice: Number(req.body.productPrice),
      description: req.body.description,
      productCategory: req.body.productCategory,
      productImage: imageUrl,
      productCount: Number(req.body.productCount),
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.log("Product add error:", err);
    res.status(400).json({ error: err.message || "Failed to add product" });
  }
 }

 export async function updateProduct(req, res) {
  try {
    const { id } = req.params; 
    const updatedData = req.body;


    const updatedProduct = await products.findByIdAndUpdate(
      id,
      updatedData,
      { new: true } 
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update product" });
  }
}

export async function deleteProduct(req,res){
  try {
    const { id } = req.params; 
    const deletedProduct = await products.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete product" });
  }
} 
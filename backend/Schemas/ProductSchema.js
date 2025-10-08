import { Schema, model } from "mongoose";

const productSchema = new Schema({
  productName: { type: String, required: true },
  productCategory: { type: String, required: true },
  productPrice: { type: Number, required: true },
  description: String,
  productImage: [String],
  productCount: Number
}, { timestamps: true });


const Product = model("Product", productSchema);

export default Product;

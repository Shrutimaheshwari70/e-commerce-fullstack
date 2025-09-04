import { Router } from "express";
import { addProduct, getProduct } from "../Controllers/Products.js";

const products= Router()
products.get("/",getProduct)
products.post("/add-product",addProduct )
export default products 
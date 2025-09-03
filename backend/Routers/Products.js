import { Router } from "express";
import { getProduct } from "../Controllers/Products.js";

const products= Router()
products.get("/",getProduct)

export default products 
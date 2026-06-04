import express from "express"
import { addProduct, deleteProduct, updateProduct } from "../controllers/product.contoller.js"

const productRouter = express.Router()

productRouter.post("/addproduct",addProduct)
productRouter.post("/updateproduct/:id",updateProduct)
productRouter.get("/deleteproduct/:id",deleteProduct)

export {productRouter}
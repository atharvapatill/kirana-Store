import express from "express"
import { addOrders} from "../controllers/order.controller.js"

const orderRouter = express.Router()

orderRouter.post("/addorders/:id",addOrders)

export {orderRouter}
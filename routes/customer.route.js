import express from "express"
import { addCustomer, reduceCredit , getAllCustomers, UpdateCustomer, customerReminder  } from "../controllers/customer.controller.js"

const customerRouter = express.Router()

customerRouter.post("/addcustomer",addCustomer)
customerRouter.post("/reducecredit/:id",reduceCredit)
customerRouter.post("/updatecustomer/:id",UpdateCustomer)
customerRouter.get("/customers",getAllCustomers)
customerRouter.get("/sendreminder/:id",customerReminder)

export {customerRouter}
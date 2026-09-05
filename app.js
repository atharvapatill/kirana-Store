import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./db.js"
import session from "express-session"

dotenv.config()

const app = express()

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:"secret",
    saveUninitialized:false,
    resave:false
}))

import { userRouter } from "./routes/user.route.js"
import { productRouter } from "./routes/product.route.js"
import { orderRouter } from "./routes/order.route.js"
import { customerRouter } from "./routes/customer.route.js"
import { isLoggedIn } from "./middlewares/auth.middleware.js"

import { loginEJS, registrationEJS } from "./controllers/user.controller.js"
import { addProductEJS,updateProductEJS, productDashboardEJS } from "./controllers/product.contoller.js"
import { paymentEJS } from "./controllers/payment.controller.js"
import { addOdersEJS } from "./controllers/order.controller.js"
import { errorEJS } from "./controllers/error.controller.js"
import { addCustomerEJS,updateCustomerEJS, customerEJS, customerDashboardEJS, homeEJS  } from "./controllers/customer.controller.js"

app.use("/api",userRouter)
app.use("/api",productRouter)
app.use("/api",orderRouter)
app.use("/api",customerRouter)

app.get("/",(req,res)=>{
    res.redirect("/home")
});

app.get("/login",loginEJS)
app.get("/registration",registrationEJS)

app.use(isLoggedIn);

app.get("/addproduct",addProductEJS)
app.get("/updateproduct/:id",updateProductEJS)
app.get("/productdashboard",productDashboardEJS)

app.get("/payment/:id",paymentEJS)

app.post("/addorder/:id",addOdersEJS)

app.get("/error",errorEJS)

app.get("/addcustomer",addCustomerEJS)
app.get("/customer/:id",customerEJS)
app.get("/edit/:id",updateCustomerEJS)
app.get("/customerdashboard",customerDashboardEJS)
app.get("/home",homeEJS)


connectDB()

app.listen(3000,()=>{
    console.log("Server is Running")
})
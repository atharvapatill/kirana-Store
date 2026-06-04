import { userRegistration, userLogin, userLogout } from "../controllers/user.controller.js"
import express from "express"


const userRouter = express.Router()

userRouter.post("/login",userLogin)
userRouter.post("/registration",userRegistration)
userRouter.post("/logout",userLogout)

export {userRouter}

import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase: true
    },
    email:{
        type:String,
        required:true,
        index:true
    },
    credit:{
        type:Number,
        required:true,
        default:0
    },
    purchaseMade:{
        type:Number,
        required:true,
        default:0
    }
})

export const Customer = mongoose.model("Customer",customerSchema)
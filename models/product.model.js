import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase: true
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

export const Product = mongoose.model("Product", productSchema)
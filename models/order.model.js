import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customer_id : {
        type:String,
        required:true
    },
    products:[
        {
            product_id:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            price:{
                type:Number,
                required:true
            }
        }
    ],
    amount:{
        type:Number,
        required:true
    }
},{timestamps:true})

export const Order = mongoose.model("Order",orderSchema)


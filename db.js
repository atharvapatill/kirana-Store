import mongoose from "mongoose";

const db_name = "kirana_store"

const connectDB = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${db_name}`)
        console.log("DB connected successfully")
    } catch (error) {
        console.log("DB connection Failed")
        process.exit(1)
    }
}

export {connectDB}
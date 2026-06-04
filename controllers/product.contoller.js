import { Product } from "../models/product.model.js";

const addProduct = async(req,res)=>{
    try {
        const {name, quantity, price} = req.body;

        if (!name || !quantity || !price) {
            console.log("name, quantity and price are required")
            res.redirect("/error")
        }
        const existingProduct = await Product.findOne({name});

        if(existingProduct){
            const updatedQuantity = existingProduct.quantity + quantity;
            await Product.findByIdAndUpdate({_id:existingProduct._id},{quantity:updatedQuantity});
            console.log("Product already exist, updated the quantity")
            res.redirect("/productDashboard")
        }
        const lowerCaseName = name.toLowerCase()
        const newProduct = new Product({name:lowerCaseName,quantity,price});
        await newProduct.save();
        
        console.log("Product added sucessfully" )
        res.redirect("/productDashboard")
    
    } catch (error) {
        console.error("Failed to add Product : ", error);
        res.redirect("/error")
    }
}

const updateProduct = async (req,res) => {
    try {
        const {name, quantity, price} = req.body;
        const productID = req.params.id;

        if (!name || !quantity || !price) {
            console.log("name, quantity and price are required")
            return res.redirect("/error")
        }

        const lowerCaseName = name.toLowerCase()

        await Product.findByIdAndUpdate({_id:productID},{name:lowerCaseName,quantity,price})

        console.log("Product Updated")

        return res.redirect("/productDashboard")
    
    } catch (error) {
        console.error("Failed to Update Product : ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const deleteProduct = async (req,res)=>{
    try {
        const productID = req.params.id;
        await Product.findByIdAndUpdate(productID,{isDeleted:true})

        console.log("Product Deleted")
        res.redirect("/productDashboard")
    } catch (error) {
        console.error("Failed to Delete Product : ", error);
        res.redirect("/error")
    }
}

const addProductEJS = async (req,res)=>{
    try {
        return res.render("addProduct")
    } catch (error) {
        console.error("Failed to Render add Product Page",error)
        return res.redirect("/error")
    }
}

const updateProductEJS = async (req,res)=>{
    try {

        const productID = req.params.id 

        const product = await Product.findById(productID)

        if(!product){
            return res.redirect("/error")
        }
        
        return res.render("updateProduct",{product})
    

    } catch (error) {
        console.error("Failed to Render update Product Page",error)
        return res.redirect("/error")
    }
}

const productDashboardEJS = async (req,res)=>{
    try {
            const productName = req.query.productName

            if(!productName){
                const products = await Product.find({}).sort({quantity:1})
                return res.render("productDashboard",{products})
            }

            const products = await Product.find({name:productName}).sort({quantity:1})
            return res.render("productDashboard",{products})

    
    } catch (error) {
        console.error("Failed to Render Product Dashboard",error)
        return res.redirect("/error")
    }
}

export {addProduct,updateProduct,deleteProduct,addProductEJS,updateProductEJS, productDashboardEJS}
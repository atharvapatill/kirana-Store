import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { Customer } from "../models/customer.model.js";

const addOrders = async (req,res) => {
    try {
        
        const {products,amount} = req.body;
        const customer_id = req.params.id.trim();

        if(!products || !amount){
            console.log("Products with their total amout required")
            return res.redirect("/error")
        }

        const existingCustomer = await Customer.findById(customer_id)
        
        if(!existingCustomer){
            console.log("Invalid customer");
            return res.redirect("/error")
        }

        for (const product of products) {
            const productId = product.product_id
            const existingproduct = await Product.findById(productId)
            if(!existingproduct){
                console.log("Product does not exist");          
                return res.redirect("/error")
            }
            const quantity = existingproduct.quantity - product.quantity 
            await Product.findByIdAndUpdate({_id:productId},{quantity})
        }


        const newCredit = existingCustomer.credit + amount
        const newPurchasemade = existingCustomer.purchaseMade + amount

        await Customer.findByIdAndUpdate({_id:customer_id},{credit:newCredit,purchaseMade:newPurchasemade})

        const newOrder = new Order({customer_id,products,amount})
        
        await newOrder.save()

        console.log("order successfull");

        return res.json({ redirect: `/payment/${customer_id}` })
    } catch (error) {
        console.error("Failed to add Orders",error)
        res.redirect("/error")
    }
}

const addOdersEJS = async(req,res)=>{
    try {
        const customerId = req.params.id
        const {noOfProducts} = req.body
        const products = await Product.find({isDeleted:false})

        if(!noOfProducts){
            console.log("No of products are null or empty");
            return res.redirect("/error")
        }
        
        if(!products){
            console.log("There are no products in the inventory");
            return res.redirect("/error")
        }

        return res.render("addOrder",{noOfProducts,products,customerId})
    } catch (error) {
        console.error("Failed to render add order page",error)
        res.redirect("/error")
    }
}

export {addOrders,addOdersEJS}

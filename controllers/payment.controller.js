import { Customer } from "../models/customer.model.js"

const paymentEJS = async (req,res)=>{
    try {
            const customerID = req.params.id

            const customer = await Customer.findById(customerID)
            
            if(!customer){
                console.log("No customer found for payment");
                res.redirect("/error")
            }

            res.render("payment",{customer})
    
    } catch (error) {
        console.error("Failed to render Payment Page",error)
        res.redirect("/error")
    }
}

export {paymentEJS}
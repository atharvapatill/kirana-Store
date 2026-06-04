import { Customer } from "../models/customer.model.js";
import {Order} from "../models/order.model.js";
import {Product} from "../models/product.model.js";
import { sendMail } from "./mail.controller.js";

const addCustomer = async(req,res)=>{
    try {
        const {name, email} = req.body 

        if(!name || !email){
            console.log("Name and email is required");
            return res.redirect("/error")
        }

        const newCustomer = new Customer({name,email})
        await newCustomer.save()

        console.log("Customer added Successfully");
        return res.redirect("/customerdashboard")

    } catch (error) {
        console.error("Failed to add Customer : ", error);
        return res.redirect("/error")
    }
}

const reduceCredit = async(req,res)=>{
    try {
        const {amount} = req.body
        const existingCustomer = await Customer.findById(req.params.id)
        
        if(!existingCustomer){
            console.log("Customer not exists");
            return res.redirect("/error")
        }

        const updatedCredit = existingCustomer.credit - amount

        await Customer.findByIdAndUpdate({_id:req.params.id},{credit:updatedCredit})
        console.log("Credit Reduced Successfully")

        res.redirect(`/customer/${req.params.id}`)

    } catch (error) {
        console.error("Failed to reduce credit: ", error);
        res.redirect("/error")
    }
}

const getAllCustomers = async(req,res)=>{
    try {
        const allCustomers = await Customer.find({})
        res.status(200).json({allCustomers})
        
    } catch (error) {
        console.error("Failed to get all customers: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const UpdateCustomer = async (req,res) => {
    try {
        const {name,email} = req.body
        const customerID = req.params.id

        if(!name || !email){
            console.log("name and email required");
            return res.redirect("/error")
        }

        const existingCustomer = await Customer.findById(customerID)

        if(!existingCustomer){
            console.log("Customer did not exist");      
            return res.redirect("/error")
        }

        await Customer.findByIdAndUpdate(customerID,{name,email})

        res.redirect("/customerDashboard")

    } catch (error) {
        console.error("Failed to Update Customer ", error);
        return res.redirect("/error")
    }
}

const customerReminder = async (req,res) => {
    try {
        
        const customer_id = req.params.id;
    
        if(!customer_id){
            return res.redirect("/error");
        }
    
        const customer = await Customer.findById(customer_id);
    
        if(!customer){
            console.log("Customer Not Found")
            return res.redirect("/error");
        }
    
        const mail = customer.email;
        const credit = customer.credit;
    
        await sendMail(mail,credit);
    
        return res.redirect("/home");

    } catch (error) {
        console.error("Failed to send Reminder", error)
        res.redirect("/error");
    }
    
}

const addCustomerEJS = (req,res)=>{
    try {
            return res.render("addCustomer");

    } catch (error) {
        console.log("Failed to render add customer Page", error);
        res.redirect("/error")
    }
};

const updateCustomerEJS = async (req,res)=>{
    try {
        const customerID = req.params.id
        const customer = await Customer.findById(customerID)
        return res.render("updateCustomer",{customer})
    } catch (error) {
        console.error("Failed to Edit Customer", error);
        return res.redirect("/error")
    }
};

const customerEJS = async (req, res) => {
  try {
    const customerID = req.params.id;

    const customerDetails = await Customer.findById(customerID).lean();
    if (!customerDetails) {
      return res.redirect("/error");
    }

    const orders = await Order.find({ customer_id: customerID }).lean();

    for (let order of orders) {
      const products = await Promise.all(
        order.products.map(async (product) => {
          const p = await Product.findById(product.product_id).lean();

          return {
            ...product,
            productname: p?.name || "Unknown Product",
          };
        })
      );

      order.products = products;
    }

    orders.reverse()

    res.render("customer", { customerDetails, orders });

  } catch (error) {
    console.log("Failed to render customer Page", error);
    return res.redirect("/error");
  }
};

const customerDashboardEJS = async(req,res)=>{
    try {   
            const email = req.query.email;

            if(!email){
                const customers = await Customer.find({}).sort({name:1})
                return res.render("customerDashboard",{customers})
            }

            const customers = await Customer.find({email:email})
            return res.render("customerDashboard",{customers})

    } catch (error) {
        console.log("Failed to render customer Dashboard", error);
        res.redirect("/error")
    }
}

const homeEJS = async(req,res)=>{
    try {
            const customers = await Customer.find({}).sort({credit:-1})

            let totalcredit = 0

            for(let i=0; i<customers.length; i++){
                totalcredit+=customers[i].credit
            }

            res.render("home",{customers,totalcredit})

    } catch (error) {
        console.log("Failed to render customer Dashboard", error);
        res.redirect("/error")
    }
}
export {addCustomer, reduceCredit, getAllCustomers, UpdateCustomer,customerReminder , addCustomerEJS, updateCustomerEJS, customerEJS, customerDashboardEJS, homeEJS}
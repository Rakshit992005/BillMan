import customerModel from "../models/customer.model.js";


const createCustomer = async (req , res) => {
    const { name , email , mobile , address } = req.body;

    if(!name || !email || !mobile || !address){
        return res.status(400).json({message:"All fields are required"});
    }

    try {
        const newCustomer = await customerModel.create({
            name,
            email,
            mobile,
            address
        })

        return res.status(201).json({
            message:"Customer created successfully",
            customer : newCustomer
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error while creating customer",
            error : error.message
        })
    }

}


const getAllCustomers = async (req , res) =>{
    try {
        const customers = await customerModel.find();
        return res.status(200).json({
            message:"Customers fetched successfully",
            customers
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error while fetching customers",
            error : error.message
        })
    }
}

const getCustomerById = async (req , res) =>{
    try{
        const { id } = req.params;
        const customer = await customerModel.findById(id);

        if(!customer){
            return res.status(404).json({message:"Customer not found"})
        }

        return res.status(200).json({
            message:"Customer fetched successfully",
            customer
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error while fetching customer",
            error : error.message
        })
    }
}



export {
    createCustomer,
    getAllCustomers,
    getCustomerById
}
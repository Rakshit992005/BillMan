import customerModel from "../models/customer.model.js";
import invoiceModel from "../models/invoice.model.js";


const createCustomer = async (req, res) => {
    const { name, email, mobile, address } = req.body;

    if (!name || !address) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newCustomer = await customerModel.create({
            name,
            email: email || "",
            mobile: mobile || "",
            address,
            userId: req.user.id,
        })

        return res.status(201).json({
            message: "Customer created successfully",
            customer: newCustomer
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error while creating customer",
            error: error.message
        })
    }

}
const updateCustomer = async (req, res) => {
    const { name, email, mobile, address } = req.body;

    if (!name || !address) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const customer = await customerModel.findById(req.params.id);

        customer.name = name;
        customer.email = email || "";
        customer.mobile = mobile || "";
        customer.address = address;

        await customer.save();

        return res.status(200).json({ message: "Customer updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error while updating customer", error: error.message });
    }
}

const getAmounts = async (id) => {
    try {
        const invoice = await invoiceModel.find({ customerId: id });

        let paidAmount = 0;
        let unpaidAmount = 0;
        let totalAmount = 0;

        invoice.forEach(invoice => {
            if (invoice.status === "paid") {
                paidAmount += invoice.totalAmount;
            } else {
                unpaidAmount += invoice.totalAmount;
            }
            totalAmount += invoice.totalAmount;
        });

        await customerModel.updateOne({ _id: id }, { $set: { paidAmount, unpaidAmount, totalAmount } });

    } catch (error) {
        console.error("error while calculating amounts", error);
    }
}


const getAllCustomers = async (req, res) => {
    try {
        const customers = await customerModel.find({ userId: req.user.id }).select('_id name email mobile address paidAmount unpaidAmount totalAmount');

        return res.status(200).json({
            message: "Customers fetched successfully",
            customers,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error while fetching customers",
            error: error.message
        })
    }
}

const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await customerModel.findOne({ _id: id, userId: req.user.id });

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" })
        }

        const invoices = await invoiceModel.find({ customerId: id });
        getAmounts(id);
        return res.status(200).json({
            message: "Customer fetched successfully",
            customer,
            invoices,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error while fetching customer",
            error: error.message
        })
    }
}



export {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer
}
import customerModel from "../models/customer.model.js";
import invoiceModel from "../models/invoice.model.js";
import mongoose from "mongoose";

const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;


const createCustomer = async (req, res) => {
    const { name, email, mobile, address } = req.body || {};

    if (!isNonEmptyString(name) || !isNonEmptyString(address) ||
        (email !== undefined && typeof email !== "string") ||
        (mobile !== undefined && typeof mobile !== "string")) {
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

    } catch {
        return res.status(500).json({
            message: "Internal server error while creating customer"
        })
    }

}
const updateCustomer = async (req, res) => {
    const { name, email, mobile, address } = req.body || {};

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid customer ID" });
    }

    if (!isNonEmptyString(name) || !isNonEmptyString(address) ||
        (email !== undefined && typeof email !== "string") ||
        (mobile !== undefined && typeof mobile !== "string")) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const customer = await customerModel.findOne({ _id: req.params.id, userId: req.user.id });

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        customer.name = name;
        customer.email = email || "";
        customer.mobile = mobile || "";
        customer.address = address;


        await customer.save();

        return res.status(200).json({ message: "Customer updated successfully" });
    } catch {
        return res.status(500).json({ message: "Internal server error while updating customer" });
    }
}

const getAmounts = async (id, userId) => {
    try {
        const invoice = await invoiceModel.find({ customerId: id, userId });

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

        await customerModel.updateOne({ _id: id, userId }, { $set: { paidAmount, unpaidAmount, totalAmount } });

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
    } catch {
        return res.status(500).json({
            message: "Internal server error while fetching customers"
        })
    }
}

const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid customer ID" });
        }

        const customer = await customerModel.findOne({ _id: id, userId: req.user.id });

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" })
        }

        const invoices = await invoiceModel.find({ customerId: id, userId: req.user.id });
        getAmounts(id, req.user.id);
        return res.status(200).json({
            message: "Customer fetched successfully",
            customer,
            invoices,
        })
    } catch {
        return res.status(500).json({
            message: "Internal server error while fetching customer"
        })
    }
}



export {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    getAmounts
}

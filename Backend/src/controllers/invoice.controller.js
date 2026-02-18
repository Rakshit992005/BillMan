import invoiceModel from "../models/invoice.model.js";
import mongoose from "mongoose";

const createInvoice = async (req, res) => {
    const { invoiceNumber, date, customerId, items } = req.body;

    if (!invoiceNumber || !date || !customerId || !items) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {

        const totalAmount = items.reduce((acc, item) => acc + item.totalAmount, 0);

        const newInvoice = await invoiceModel.create({
            invoiceNumber,
            date,
            customerId,
            items,
            totalAmount,
        })

        return res.status(201).json({ message: "Invoice created successfully", newInvoice });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error while creating invoice" });
    }

}


const getAllInvoices = async (req, res) => {
    const { status } = req.params;

    const allowedStatus = ['pending', 'paid', 'quotation'];

    if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
    }

    try {
        let filter = {};

        if (status !== "all") {
            filter.status = status;
        }

        const invoices = await invoiceModel.find(filter);

        return res.status(200).json({
            message: "Invoices fetched successfully",
            count: invoices.length,
            invoices
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error while fetching invoices"
        });
    }
};


const getInvoiceById = async (req, res) => {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid invoice ID"
        });
    }

    try {
        const invoice = await invoiceModel.findById(id)
            .populate("customerId"); // optional if you want customer details

        if (!invoice) {
            return res.status(404).json({
                message: "Invoice not found"
            });
        }

        return res.status(200).json({
            message: "Invoice fetched successfully",
            invoice
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error while fetching invoice"
        });
    }
};

const stausPaid = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid invoice ID"
        });
    }
    try {
        const updatedInvoice = await invoiceModel.findByIdAndUpdate(
            id,
            { status: 'paid' },
            { new: true}
        );

        if(!updatedInvoice){
            return res.status(404).json({
                message: "Invoice not found"
            });
        }

        return res.status(200).json({
            message: "Invoice status updated successfully",
            updatedInvoice
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error while updating invoice status"
        });
    }

}

const deleteByid = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid invoice ID"
        });
    }
    try {
        const deletedInvoice = await invoiceModel.findByIdAndDelete(id);

        if(!deletedInvoice){
            return res.status(404).json({
                message: "Invoice not found"
            });
        }

        return res.status(200).json({
            message: "Invoice deleted successfully",
            deletedInvoice
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error while deleting invoice"
        });
    }

}




export {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    stausPaid,
    deleteByid

}
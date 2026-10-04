import invoiceModel from "../models/invoice.model.js";
import mongoose from "mongoose";
import { getAmounts } from "./customer.controller.js";
import customerModel from "../models/customer.model.js";

const allowedStatuses = ["pending", "paid", "quotation"];
const isValidItem = (item) => item &&
    typeof item === "object" &&
    typeof item.description === "string" &&
    item.description.trim().length > 0 &&
    Number.isFinite(item.quantity) &&
    Number.isFinite(item.price) &&
    Number.isFinite(item.totalAmount);

const createInvoice = async (req, res) => {
    const { invoiceNumber, date, customerId, items, status } = req.body || {};

    if (typeof invoiceNumber !== "string" || !invoiceNumber.trim() ||
        typeof date !== "string" || Number.isNaN(Date.parse(date)) ||
        typeof customerId !== "string" || !mongoose.Types.ObjectId.isValid(customerId) ||
        !Array.isArray(items) || items.length === 0 || items.length > 500 ||
        !items.every(isValidItem) ||
        (status !== undefined && !allowedStatuses.includes(status))) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const customer = await customerModel.exists({ _id: customerId, userId: req.user.id });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const ifExist = await invoiceModel.findOne({ invoiceNumber: invoiceNumber, userId: req.user.id });

        const totalAmount = items.reduce((acc, item) => acc + item.totalAmount, 0);
        if (!Number.isFinite(totalAmount)) {
            return res.status(400).json({ message: "Invalid invoice total" });
        }
        if (ifExist) {
            const updatedInvoice = await invoiceModel.findOneAndUpdate(
                { invoiceNumber: invoiceNumber, userId: req.user.id },
                { items: items, totalAmount: totalAmount, status: status },
                { returnDocument: "after" }
            );
            await getAmounts(updatedInvoice.customerId, req.user.id);
            return res.status(200).json({ message: "Invoice updated successfully", updatedInvoice });
        }

        const newInvoice = await invoiceModel.create({
            invoiceNumber,
            date,
            customerId,
            userId: req.user.id,
            items,
            totalAmount,
            status,
        })

        await getAmounts(newInvoice.customerId, req.user.id);

        return res.status(201).json({ message: "Invoice created successfully", newInvoice });

    } catch {
        return res.status(500).json({ message: "Internal server error while creating invoice" });
    }

}


const getAllInvoices = async (req, res) => {
    const { status } = req.params;

    const allowedStatus = [...allowedStatuses, 'all'];

    if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
    }

    try {
        let filter = { userId: req.user.id };

        if (status !== "all") {
            filter.status = status;
        }

        const invoices = await invoiceModel.find(filter).populate('customerId', 'name').sort({ createdAt: -1 });

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
        const invoice = await invoiceModel.findOne({ _id: id, userId: req.user.id })

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
        const updatedInvoice = await invoiceModel.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            { status: 'paid' },
            { new: true }
        );

        if (!updatedInvoice) {
            return res.status(404).json({
                message: "Invoice not found"
            });
        }

        await getAmounts(updatedInvoice.customerId, req.user.id);

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
        const deletedInvoice = await invoiceModel.findOneAndDelete({ _id: id, userId: req.user.id });

        if (!deletedInvoice) {
            return res.status(404).json({
                message: "Invoice not found"
            });
        }

        await getAmounts(deletedInvoice.customerId, req.user.id);

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

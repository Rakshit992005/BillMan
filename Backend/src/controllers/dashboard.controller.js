import invoiceModel from "../models/invoice.model.js";
import customerModel from "../models/customer.model.js";
import mongoose from "mongoose";

const getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;

        // Optimized aggregation to fetch all invoice stats in one query
        const invoiceStats = await invoiceModel.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                }
            },
            {
                $group: {
                    _id: null,
                    totalInvoices: { $sum: 1 },
                    paidAmount: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "paid"] }, "$totalAmount", 0]
                        }
                    },
                    pendingAmount: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "pending"] }, "$totalAmount", 0]
                        }
                    },
                    paidCount: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "paid"] }, 1, 0]
                        }
                    },
                    pendingCount: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "pending"] }, 1, 0]
                        }
                    }
                }
            }
        ]);

        // Fetch total customers count
        const totalCustomers = await customerModel.countDocuments({ userId });

        const stats = invoiceStats[0] || {
            totalInvoices: 0,
            paidAmount: 0,
            pendingAmount: 0,
            paidCount: 0,
            pendingCount: 0
        };

        return res.status(200).json({
            success: true,
            message: "Dashboard Data Fetched Successfully",
            data: {
                income: stats.paidAmount,
                pending: stats.pendingAmount,
                totalAmount: stats.paidAmount + stats.pendingAmount,
                totalInvoices: stats.totalInvoices,
                paidInvoicesCount: stats.paidCount,
                pendingInvoicesCount: stats.pendingCount,
                totalCustomers: totalCustomers
            }
        });

    } catch (error) {
        console.error("Dashboard calculation error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error while fetching dashboard data",
            error: error.message
        });
    }
}

export {
    getDashboardData,
}

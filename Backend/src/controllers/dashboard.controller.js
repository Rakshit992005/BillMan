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


const getDashboardGraphData = async (req , res) =>{
        const  range = req._parsedUrl.query;

        if(![ "week" , "month" , "year"].includes(range)){
            return res.status(400).json({
                success: false,
                message: "Invalid range",
                error: "Range should be week, month or year"
            })
        }

    try {
        const now = new Date();
        let startDate = new Date();
        let groupFormat;
        let totalUnits;

        if (range === "week") {
            startDate.setDate(now.getDate() - 6);
            startDate.setHours(0, 0, 0, 0);

            groupFormat = { $dayOfWeek: "$createdAt" };
            totalUnits = 7;
        }

        else if (range === "month") {
            startDate.setDate(now.getDate() - 29);
            startDate.setHours(0, 0, 0, 0);

            groupFormat = { $dayOfMonth: "$createdAt" };
            totalUnits = 30;
        }

        else if (range === "year") {
            startDate.setMonth(now.getMonth() - 11);
            startDate.setDate(1);
            startDate.setHours(0, 0, 0, 0);

            groupFormat = { $month: "$createdAt" };
            totalUnits = 12;
        }

        const endDate = now;

        const rawData = await invoiceModel.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.user.id),
                    status: "paid",
                    createdAt: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: groupFormat,
                    totalAmount: { $sum: "$totalAmount" }
                }
            }
        ]);

        const resultMap = {};

        rawData.forEach(item => {
            resultMap[item._id] = item.totalAmount;
        });

        const finalData = [];

        for (let i = 1; i <= totalUnits; i++) {
            finalData.push({
                label: i,
                totalAmount: resultMap[i] || 0
            });
        }

        return res.status(200).json({
            success: true,
            message: "Dashboard Graph Data Fetched Successfully",
            range,
            startDate,
            endDate,
            data: finalData
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error while fetching dashboard graph data",
            error: error.message
        })
    }
}

export {
    getDashboardData,
    getDashboardGraphData,
    
}

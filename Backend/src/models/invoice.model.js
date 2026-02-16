import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
    },
    totalAmount:{
        type:Number,
        required:true,
    },
})

const invoiceSchema = new mongoose.Schema({
    invoiceNumber:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required:true,
    },
    items:[itemSchema],
    totalAmount:{
        type:Number,
        required:true,
    },
    
},{
    timestamps:true,
})

const invoiceModel = mongoose.model('Invoice', invoiceSchema);
export default invoiceModel;
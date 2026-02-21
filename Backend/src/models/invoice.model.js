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
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    items:[itemSchema],
    totalAmount:{
        type:Number,
    },
    status:{
        type:String,
        enum:['pending' , 'paid' , 'quotation'],
        default:'pending',
    },
    
},{
    timestamps:true,
})

const invoiceModel = mongoose.model('Invoice', invoiceSchema);
export default invoiceModel;
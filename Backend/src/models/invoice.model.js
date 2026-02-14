import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    invoiceNumber:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    coustomerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    items:[
        {
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
        }
    ],
    totalAmount:{
        type:Number,
        required:true,
    },
    
},{
    timestamps:true,
})

const invoiceModel = mongoose.model('Invoice', invoiceSchema);
export default invoiceModel;
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim : true,
        lowercase : true,
    },
    email:{
        type:String,
        trim : true,
    },
    mobile:{
        type:String,
        trim : true,
    },
    address:{
        type:String,
        required:true,
        trim : true,
    },
    paidAmount:{
        type:Number,
        default:0,
    },
    unpaidAmount:{
        type:Number,
        default:0,
    },
    totalAmount:{
        type:Number,
        default:0,
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    }
},{
    timestamps:true,
});

const customerModel = mongoose.model('Customer', customerSchema);
export default customerModel;
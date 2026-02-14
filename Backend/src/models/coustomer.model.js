import mongoose from "mongoose";

const coustomerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
    },
    mobile:{
        type:String,
    },
    address:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
});

const coustomerModel = mongoose.model('Coustomer', coustomerSchema);
export default coustomerModel;
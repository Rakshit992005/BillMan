import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    companyName:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    }
},
{
    timestamps:true,
});


const userModel = mongoose.model('User', userSchema);
export default userModel;
import mongoose from 'mongoose';


const bankDetailsSchema = new mongoose.Schema({
    bankName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    ifscCode: {
        type: String,
        required: true
    },
    branchName: {
        type: String,
        required: true
    },
    panNumber: {
        type: String,
        required: true
    },
    upiId: {
        type: String,
        required: true
    }
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    logoUrl: {
        type: String,
        required: false,
    },
    stampUrl: {
        type: String,
        required: false,
    },
    bankDetails: {
        type: bankDetailsSchema,
        required: false,
    },
    invoiceSuffix: {
        type: String,
        required: false,
    }
},
    {
        timestamps: true,
    });


const userModel = mongoose.model('User', userSchema);
export default userModel;
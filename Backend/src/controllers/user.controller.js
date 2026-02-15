import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";


const userRegister = async (req , res)=>{
    const { name , email , companyName , address , mobile , password  } = req.body;

    if(!name || !email || !companyName || !address || !mobile || !password){
        return res.status(400).json({message:"All fields are required"});
    }

    if(password.length < 6){
        return res.status(400).json({message:"Password must be at least 6 characters long"});
    }

    const userExist = await userModel.findOne({email});

    if(userExist) {
        return res.status(400).json({message:"User already exists"});
    }

    try {
        
        const hashedPassword = await bcrypt.hash(password , 10);
        
        const newUser = await userModel.create({
            name,
            email,
            password:hashedPassword,
            companyName,
            address,
            mobile
        });

        const option = {
            httpOnly : true,
            secure : true,
            sameSite : "strict",
            maxAge : 15 * 60 * 60 * 1000
        }

        const token = jwt.sign({
            id : newUser._id
        }, process.env.JWT_SECRET , { expiresIn : process.env.JWT_EXPIRES_IN });

        res.cookie("token" , token , option);

        return res.status(201).json({
            message:"User registered successfully",
            user : {
                name,
                email,
                companyName,
                address,
                mobile
            }
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",
            error : error.message
        })
    }

}

const userLogin = async (req , res) => {
    const { email , password } = req.body;

    if(!email || !password){
        return res.status(400).json({message:"All fields are required"});
    }

    
    try {
        const user = await userModel.findOne({ email });
    
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        
        const isPasswordValid = await bcrypt.compare(password , user.password);

        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({
            id : user._id
        } , process.env.JWT_SECRET , { expiresIn : process.env.JWT_EXPIRES_IN});

        const option = {
            httpOnly : true,
            secure : true,
            sameSite : "strict",
            maxAge : 15 * 60 * 60 * 1000
        }
        res.cookie("token" , token , option);

        return res.status(200).json({
            message:"User logged in successfully",
            user : {
                name : user.name,
                email : user.email,
                companyName : user.companyName,
                address : user.address,
                mobile : user.mobile
            }
        })
    
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",
            error : error.message
        })
    }
}

const userLogout = async (req , res) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    const option = {
        httpOnly : true,
        secure : true,
        sameSite : "strict",
        maxAge : 15 * 60 * 60 * 1000
    }
    res.clearCookie("token" , option);
    return res.status(200).json({message:"User logged out successfully"})
}





export {
    userRegister,
    userLogin,
    userLogout,
}
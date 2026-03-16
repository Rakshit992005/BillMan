import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import uploadFile from "../utils/imagekit.js";

const userRegister = async (req, res) => {
    console.log("reached");
    const files = req.files;
    console.log("files:", files);
    console.log("req.body:", req.body);
    const { name, email, companyName, address, mobile, password, bankName, accountNumber, ifscCode, branchName, panNumber } = req.body;

    if (!name || !email || !companyName || !address || !mobile || !password || !bankName || !accountNumber || !ifscCode || !branchName || !panNumber) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const userExist = await userModel.findOne({ email });

    if (userExist) {
        return res.status(400).json({ message: "User already exists" });
    }

    try {

        const hashedPassword = await bcrypt.hash(password, 10);
        const logoUrl = await uploadFile(files.logo[0].buffer.toString("base64"));
        const stampUrl = await uploadFile(files.stamp[0].buffer.toString("base64"));
        console.log(logoUrl, stampUrl);
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
            companyName,
            address,
            mobile,
            logoUrl,
            stampUrl,
            bankDetails: {
                bankName,
                accountNumber,
                ifscCode,
                branchName,
                panNumber,
            }
        });

        const option = {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 60 * 1000
        }

        const token = jwt.sign({
            id: newUser._id
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.cookie("token", token, option);

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                name,
                email,
                companyName,
                address,
                mobile,
                logoUrl,
                stampUrl,
                bankDetails: {
                    bankName,
                    accountNumber,
                    ifscCode,
                    branchName,
                    panNumber,
                }
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }

}

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }


    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        const option = {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 60 * 1000
        }
        res.cookie("token", token, option);

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                name: user.name,
                email: user.email,
                companyName: user.companyName,
                address: user.address,
                mobile: user.mobile,
                bankDetails: user.bankDetails,
                logoUrl: user.logoUrl,
                stampUrl: user.stampUrl
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

const userLogout = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const option = {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 15 * 60 * 60 * 1000
    }
    res.clearCookie("token", option);
    return res.status(200).json({ message: "User logged out successfully" })
}

const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {

        const user = await userModel.findById(req.user.id);

        const check = await bcrypt.compare(currentPassword, user.password);

        if (!check) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({ message: "Password changed successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error while changing password", error: error.message });
    }

}

const updateUserDetails = async (req, res) => {
    const { name, companyName, address, mobile, bankName, accountNumber, ifscCode, branchName, panNumber } = req.body;

    if (!name || !companyName || !address || !mobile || !bankName || !accountNumber || !ifscCode || !branchName || !panNumber) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await userModel.findById(req.user.id);

        const files = req.files || {};
        
        if (files.logo && files.logo.length > 0) {
            const logoUrl = await uploadFile(files.logo[0].buffer.toString("base64"));
            user.logoUrl = logoUrl;
        }
        
        if (files.stamp && files.stamp.length > 0) {
            const stampUrl = await uploadFile(files.stamp[0].buffer.toString("base64"));
            user.stampUrl = stampUrl;
        }

        user.name = name;
        user.companyName = companyName;
        user.address = address;
        user.mobile = mobile;
        user.bankDetails.bankName = bankName;
        user.bankDetails.accountNumber = accountNumber;
        user.bankDetails.ifscCode = ifscCode;
        user.bankDetails.branchName = branchName;
        user.bankDetails.panNumber = panNumber;

        await user.save();

        return res.status(200).json({ message: "User details updated successfully", user: {
            name: user.name,
            email: user.email,
            companyName: user.companyName,
            address: user.address,
            mobile: user.mobile,
            logoUrl: user.logoUrl,
            stampUrl: user.stampUrl,
            bankDetails: user.bankDetails
        }});
    } catch (error) {
        return res.status(500).json({ message: "Internal server error while updating user details", error: error.message });
    }

}



export {
    userRegister,
    userLogin,
    userLogout,
    changePassword,
    updateUserDetails
}
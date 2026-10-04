import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import uploadFile from "../utils/imagekit.js";

const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;
const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 60 * 60 * 1000,
    path: "/",
};

const isSupportedImage = (buffer) => {
    if (!Buffer.isBuffer(buffer) || buffer.length < 12) return false;

    const header = buffer.subarray(0, 12);
    return (header[0] === 0xff && header[1] === 0xd8 && header[2] === 0xff) ||
        header.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) ||
        header.subarray(0, 6).toString("ascii") === "GIF87a" ||
        header.subarray(0, 6).toString("ascii") === "GIF89a" ||
        (header.subarray(0, 4).toString("ascii") === "RIFF" &&
            header.subarray(8, 12).toString("ascii") === "WEBP");
};

const userRegister = async (req, res) => {
    // console.log("reached");
    const files = req.files;
    // console.log("files:", files);
    // console.log("req.body:", req.body);
    const { name, email, companyName, address, mobile, password, bankName, accountNumber, ifscCode, branchName, panNumber, upiId, invoiceSuffix } = req.body || {};

    const requiredValues = [name, email, companyName, address, mobile, password, bankName, accountNumber, ifscCode, branchName, panNumber, upiId];
    if (!requiredValues.every(isNonEmptyString) ||
        (invoiceSuffix !== undefined && typeof invoiceSuffix !== "string")) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    try {
        const logo = files?.logo?.[0]?.buffer;
        const stamp = files?.stamp?.[0]?.buffer;
        if (!isSupportedImage(logo) || !isSupportedImage(stamp)) {
            return res.status(400).json({ message: "Valid logo and stamp images are required" });
        }

        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const logoUrl = await uploadFile(logo.toString("base64"));
        const stampUrl = await uploadFile(stamp.toString("base64"));
        // console.log(logoUrl, stampUrl);
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
                upiId,
            },
            invoiceSuffix: invoiceSuffix || ""
        });

        const token = jwt.sign({
            id: newUser._id
        }, process.env.JWT_SECRET, { algorithm: "HS256", expiresIn: process.env.JWT_EXPIRES_IN || "15h" });

        res.cookie("token", token, cookieOptions);

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
                    upiId,
                },
                invoiceSuffix: invoiceSuffix || ""
            }
        })
    } catch {
        return res.status(500).json({
            message: "Internal server error"
        })
    }

}

const userLogin = async (req, res) => {
    const { email, password } = req.body || {};

    if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
        return res.status(400).json({ message: "All fields are required" });
    }


    try {
        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, { algorithm: "HS256", expiresIn: process.env.JWT_EXPIRES_IN || "15h" });

        res.cookie("token", token, cookieOptions);

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
                stampUrl: user.stampUrl,
                invoiceSuffix: user.invoiceSuffix || ""
            }
        })

    } catch {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

const userLogout = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    res.clearCookie("token", cookieOptions);
    return res.status(200).json({ message: "User logged out successfully" })
}

const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body || {};

    if (!isNonEmptyString(currentPassword) || !isNonEmptyString(newPassword)) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (newPassword.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    try {

        const user = await userModel.findById(req.user.id).select("+password");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const check = await bcrypt.compare(currentPassword, user.password);

        if (!check) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({ message: "Password changed successfully" });

    } catch {
        return res.status(500).json({ message: "Internal server error while changing password" });
    }

}

const updateUserDetails = async (req, res) => {
    const { name, companyName, address, mobile, bankName, accountNumber, ifscCode, branchName, panNumber, upiId, invoiceSuffix } = req.body || {};

    const requiredValues = [name, companyName, address, mobile, bankName, accountNumber, ifscCode, branchName, panNumber, upiId];
    if (!requiredValues.every(isNonEmptyString) ||
        (invoiceSuffix !== undefined && typeof invoiceSuffix !== "string")) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await userModel.findById(req.user.id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const files = req.files || {};
        
        if (files.logo && files.logo.length > 0) {
            if (!isSupportedImage(files.logo[0].buffer)) {
                return res.status(400).json({ message: "Invalid logo image" });
            }
            const logoUrl = await uploadFile(files.logo[0].buffer.toString("base64"));
            user.logoUrl = logoUrl;
        }
        
        if (files.stamp && files.stamp.length > 0) {
            if (!isSupportedImage(files.stamp[0].buffer)) {
                return res.status(400).json({ message: "Invalid stamp image" });
            }
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
        user.bankDetails.upiId = upiId;
        user.invoiceSuffix = invoiceSuffix || "";

        await user.save();

        return res.status(200).json({ message: "User details updated successfully", user: {
            name: user.name,
            email: user.email,
            companyName: user.companyName,
            address: user.address,
            mobile: user.mobile,
            logoUrl: user.logoUrl,
            stampUrl: user.stampUrl,
            bankDetails: user.bankDetails,
            invoiceSuffix: user.invoiceSuffix || ""
        }});
    } catch {
        return res.status(500).json({ message: "Internal server error while updating user details" });
    }

}



export {
    userRegister,
    userLogin,
    userLogout,
    changePassword,
    updateUserDetails
}

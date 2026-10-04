import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
        if (!decodedToken?.id || !mongoose.Types.ObjectId.isValid(decodedToken.id)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = decodedToken;
        next();
    } catch {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
}

export default authMiddleware;

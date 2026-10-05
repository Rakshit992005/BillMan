import express from "express";
import { userRegister, userLogin, userLogout, changePassword, updateUserDetails } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import multer from "multer";
import { createRateLimiter } from "../middlewares/security.middleware.js";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 2,
        fields: 20,
        fieldSize: 64 * 1024,
    },
    fileFilter: (req, file, callback) => {
        if (["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.mimetype)) {
            return callback(null, true);
        }

        const error = new Error("Only JPEG, PNG, GIF, and WebP images are allowed");
        error.code = "INVALID_FILE_TYPE";
        error.status = 400;
        return callback(error);
    }
});
const authRateLimit = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 20 });

const router = express.Router();

router.post("/register", authRateLimit, upload.fields([{ name: "logo", maxCount: 1 }, { name: "stamp", maxCount: 1 }]), userRegister);
router.post("/login", authRateLimit, userLogin);
router.post("/logout", authMiddleware, userLogout);
router.post("/change-password", authMiddleware, changePassword);
router.post("/update-user-details", authMiddleware, upload.fields([{ name: "logo", maxCount: 1 }, { name: "stamp", maxCount: 1 }]), updateUserDetails);
router.get('/auth', authMiddleware, (req, res) => {
    res.status(200).json({ message: "User is authenticated" })
})

export default router;

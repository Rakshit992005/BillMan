import express from "express";
import { userRegister, userLogin, userLogout } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/register", upload.fields([{ name: "logo", maxCount: 1 }, { name: "stamp", maxCount: 1 }]), userRegister);
router.post("/login", userLogin);
router.post("/logout", authMiddleware, userLogout);
router.get('/auth', authMiddleware, (req, res) => {
    res.status(200).json({ message: "User is authenticated" })
        
})

export default router;

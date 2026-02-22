import { Router } from "express";
import { getDashboardData, getDashboardGraphData } from "../controllers/dashboard.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/', authMiddleware, getDashboardData);

router.get('/graph', authMiddleware, getDashboardGraphData);



export default router
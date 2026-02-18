import { Router } from "express";
import { createCustomer , getAllCustomers , getCustomerById } from '../controllers/customer.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post("/create-customer", authMiddleware , createCustomer);
router.get('/get-all-customers', authMiddleware , getAllCustomers)
router.get("/get-customer/:id" , authMiddleware , getCustomerById)

export default router;

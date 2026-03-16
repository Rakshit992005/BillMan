import { Router } from "express";
import { createCustomer , getAllCustomers , getCustomerById , updateCustomer } from '../controllers/customer.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post("/create-customer", authMiddleware , createCustomer);
router.get('/get-all-customers', authMiddleware , getAllCustomers)
router.get("/get-customer/:id" , authMiddleware , getCustomerById)
router.put("/update-customer/:id" , authMiddleware , updateCustomer);

export default router;

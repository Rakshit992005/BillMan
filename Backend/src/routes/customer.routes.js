import { Router } from "express";
import { createCustomer , getAllCustomers , getCustomerById } from '../controllers/customer.controller.js';

const router = Router();

router.post("/create-customer", createCustomer);
router.get('/get-all-customers', getAllCustomers)
router.get("/get-customer/:id" , getCustomerById)

export default router;

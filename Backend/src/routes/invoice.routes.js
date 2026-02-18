import { createInvoice , getAllInvoices , getInvoiceById , stausPaid , deleteByid }  from "../controllers/invoice.controller.js";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create-invoice", authMiddleware , createInvoice );
router.get("/:id", authMiddleware , getInvoiceById );
router.get("/status/:status", authMiddleware , getAllInvoices ); // paid , pending , quotation
router.patch("/:id/paid" , authMiddleware , stausPaid);
router.delete('/:id/delete' , authMiddleware , deleteByid);






export default router;
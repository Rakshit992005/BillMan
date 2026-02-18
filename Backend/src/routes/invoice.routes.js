import { createInvoice , getAllInvoices , getInvoiceById , stausPaid , deleteByid }  from "../controllers/invoice.controller.js";
import { Router } from "express";

const router = Router();

router.post("/create-invoice", createInvoice );
router.get("/:id", getInvoiceById );
router.get("/status/:status", getAllInvoices ); // paid , pending , quotation
router.patch("/:id/paid" , stausPaid);
router.delete('/:id/delete' , deleteByid);







export default router;
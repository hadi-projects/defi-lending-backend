import { Router } from "express";
import { LoanController } from "../controller/loan_controller";

const router = Router();

// POST request to create a loan
router.post("/:userId", LoanController.createLoan);

export default router;

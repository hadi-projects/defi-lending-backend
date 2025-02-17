import { Router } from "express";
import { LoanController } from "../controller/loan_controller";
import { authenticateJWT } from "../middleware/auth_middleeare";


const router = Router();

// POST request to create a loan
router.post("/:userId", authenticateJWT, LoanController.createLoan);

export default router;

// http://localhost:3030/auth/google

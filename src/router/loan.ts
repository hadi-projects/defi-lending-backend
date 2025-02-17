import { Router } from "express";
import { LoanController } from "../controller/loan_controller";
import { authenticateJWT } from "../middleware/auth_middleeare";


const router = Router();

// POST request to create a loan
router.post("/:userId", authenticateJWT, LoanController.createLoan);
router.get("/", authenticateJWT, LoanController.getAllLoans);
router.post("/", authenticateJWT, LoanController.requestLoan);
router.put("/:id/approve", authenticateJWT, LoanController.approveLoan);
router.put("/:id/repay", authenticateJWT, LoanController.repayLoan);


export default router;

// http://localhost:3030/auth/google

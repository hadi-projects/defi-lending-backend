import { Router } from "express";
import { DepositController } from "../controller/deposit_controller";
import { authenticateJWT } from "../middleware/auth_middleeare";

const router = Router();

// POST request to create a deposit
router.post("/:userId", authenticateJWT,  DepositController.createDeposit);

export default router;

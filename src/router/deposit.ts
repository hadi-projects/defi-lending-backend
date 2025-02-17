import { Router } from "express";
import { DepositController } from "../controllers/depositController";

const router = Router();

// POST request to create a deposit
router.post("/:userId", DepositController.createDeposit);

export default router;

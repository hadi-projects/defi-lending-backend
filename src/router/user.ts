import { Router } from "express";
import { UserController } from "../controller/user_controller";

const router = Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.post("/", UserController.createUser);
router.delete("/:id", UserController.deleteUser);

export default router;

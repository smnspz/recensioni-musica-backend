import { Router } from "express";
import {
  createUserController,
  deleteUserController,
} from "../controllers/users.controller";
const router = Router();

router.post("/signup", createUserController);
router.delete("/user/:id", deleteUserController);

export default router;

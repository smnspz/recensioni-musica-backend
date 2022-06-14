import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
} from "../controllers/users.controller";

const router = Router();

router.get("/user", getAllUsers);
router.get("user/:id", getUserById);
router.get("/user/:username", getUserByUsername);
router.post("/signup", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;

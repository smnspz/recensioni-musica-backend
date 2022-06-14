import { Router } from "express";
import * as controller from "../controllers/users.controller";
import checkAuth from "../middleware/authorization";

const router = Router();

router.get("/user", checkAuth, controller.getAllUsers);
router.get("user/:id", checkAuth, controller.getUserById);
router.get("/user/:username", checkAuth, controller.getUserByUsername);
router.put("/user/:id", checkAuth, controller.updateUser);
router.delete("/user/:id", checkAuth, controller.deleteUser);

export default router;

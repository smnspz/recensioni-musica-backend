import { Router } from "express";
import * as controller from "../controllers/users.controller";

const router = Router();

router.get("/user", controller.getAllUsers);
router.get("user/:id", controller.getUserById);
router.get("/user/:username", controller.getUserByUsername);
router.put("/user/:id", controller.updateUser);
router.delete("/user/:id", controller.deleteUser);
router.post("/signup", controller.createUser);
router.post("/login", controller.login);

export default router;

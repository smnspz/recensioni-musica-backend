import { Router } from "express";
import * as controller from "../controllers/users.controller.js";

const router = Router();

router.post("/signup", controller.createUser);
router.post("/login", controller.login);

export default router;

import { Router } from "express";
import checkAuth from "../middleware/authorization.js";
import indexController from "../controllers/index.controller.js";

const router = Router();

router.get("/", indexController);

export default router;

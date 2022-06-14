import { Router } from "express";
import checkAuth from "../middleware/authorization";
import indexController from "../controllers/index.controller";

const router = Router();

router.get("/", checkAuth, indexController);

export default router;

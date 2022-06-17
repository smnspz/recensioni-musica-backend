import { Router } from "express";
import * as controller from "../controllers/profile.controller.js";
import checkAuth from "../middleware/authorization.js";

const router = Router();

router.post("/profile", checkAuth, controller.createProfile);
router.put("/profile/:id", checkAuth, controller.updateProfile);
router.get("/profile", checkAuth, controller.getAllProfiles);
router.get("/profile/:id", checkAuth, controller.getProfileById);
router.delete("/profile/:id", checkAuth, controller.deleteProfile);

export default router;

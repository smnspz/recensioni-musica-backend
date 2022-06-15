import { Router } from "express";
import * as controller from "../controllers/reviews.controller";
import checkAuth from "../middleware/authorization";

const router = Router();

router.post("/review", checkAuth, controller.createReview);
router.put("/review/:id", checkAuth, controller.updateReview);
router.get("/review", checkAuth, controller.getAllReviews);
router.get("/review/:id", checkAuth, controller.getReviewById);
router.delete("/review/:id", checkAuth, controller.deleteReview);

export default router;

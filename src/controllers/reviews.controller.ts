import * as dao from "../data/dao/reviews.dao.js";
import { Request, Response } from "express";
import { canUserModify } from "../logic/review.logic.js";

export const createReview = async (req: Request, res: Response) => {
  try {
    const newReview = await dao.createReview(req.body);
    return res.json(newReview);
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Something went wrong on our end :(" });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    if (canUserModify(token!, req.body.authorId)) {
      const id = Number(req.params.id);
      const updatedReview = await dao.updateReview(id, req.body);
      return res.json(updatedReview);
    }
    return res
      .status(401)
      .send({ error: "You are not authorized to perform this action" });
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Something went wrong on our end :(" });
  }
};

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await dao.getAllReview();
    return res.json(reviews);
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Something went wrong on our end :(" });
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  try {
    const review = await dao.getReviewById(Number(req.params.id));
    return res.json(review);
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Something went wrong on our end :(" });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    const reviewToDelete = await dao.getReviewById(id);
    if (reviewToDelete && canUserModify(token!, reviewToDelete.authorId)) {
      await dao.deleteReview(id);
      return res.json({});
    }
    return res
      .status(401)
      .send({ error: "You are not authorized to perform this action" });
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Something went wrong on our end :(" });
  }
};

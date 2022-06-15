import prisma from "../db/prisma-client";
import { Review } from "../../models/_index";

export const getAllReview = async () => await prisma.review.findMany();

export const getReviewById = async (id: number) =>
  await prisma.review.findUnique({ where: { id } });

export const createReview = async (review: Review) =>
  await prisma.review.create({ data: review });

export const updateReview = async (id: number, review: Review) => {
  return await prisma.review.update({
    where: {
      id: id,
    },
    data: review,
  });
};

export const deleteReview = async (id: number) => {
  return await prisma.review.delete({ where: { id: id } });
};

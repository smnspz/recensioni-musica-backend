import { Review } from "@prisma/client";
import prisma from "../db/prisma-client";

export const getAllReview = async () => await prisma.review.findMany();

export const getReviewById = async (id: number) =>
  await prisma.review.findUnique({ where: { id } });

export const createReview = async (review: Review) =>
  await prisma.review.create({ data: review });

export const updateReview = async (review: Review) => {
  return await prisma.review.update({
    where: {
      id: review.id,
    },
    data: review,
  });
};

export const deleteReview = async (id: number) =>
  await prisma.review.delete({ where: { id: id } });

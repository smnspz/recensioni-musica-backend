import { Request, Response } from "express";

export async function getAllReview(req: Request, res: Response) {
  const reviews = await prisma?.review.findMany();
  return res.json(reviews);
}

export async function getReviewById(req: Request, res: Response) {
  const { id } = req.params;
  const review = await prisma?.review.findUnique({
    where: {
      id: Number(id),
    },
  });
  return res.json(review);
}

export async function createReview(req: Request, res: Response) {
  const { album, artist, content, genre, rating, title, author } = req.body;
  const review = await prisma?.review.create({
    data: {
      album,
      artist,
      content,
      genre,
      rating,
      title,
      author,
    },
  });
  return res.json(review);
}

export function updateReview(req: Request, res: Response) {
  const { id } = req.params;
  const { album, artist, content, genre, rating, title, author } = req.body;
  const review = prisma?.review.update({
    where: {
      id: Number(id),
    },
    data: {
      album,
      artist,
      content,
      genre,
      rating,
      title,
      author,
    },
  });
  return res.json(review);
}

export function deleteReview(req: Request, res: Response) {
  const { id } = req.params;
  const review = prisma?.review.delete({
    where: {
      id: Number(id),
    },
  });
  return res.json(review);
}

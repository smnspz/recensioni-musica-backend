import { Review, User } from "@prisma/client";
import { createUser, deleteUser } from "../../../src/data/dao/users-dao";
import {
  createReview,
  deleteReview,
  getAllReview,
  getReviewById,
  updateReview,
} from "../../../src/data/dao/reviews-dao";

describe("ReviewsDao tests", () => {
  beforeAll(async () => {
    const user: User = {
      id: 113431,
      username: "John Doe",
      email: "john@doe.com",
      password: "123456",
    };
    await createUser(user);
  });

  test("Should create new review ", async () => {
    const review: Review = {
      id: 138478,
      album: "Flower Boy",
      artist: "Tyler, the Creator",
      genre: "Hip Hop",
      rating: 5,
      title: "This amazing album",
      published: false,
      authorId: 113431,
      content: "This amazing album is truly amazing",
      createdAt: null,
      updatedAt: null,
    };
    await expect(createReview(review)).resolves.toEqual(review);
  });

  test("Should update existing review ", async () => {
    const updatedReview: Review = {
      id: 138478,
      album: "Flower Boy",
      artist: "Tyler, the Creator",
      genre: "Hip Hop",
      rating: 5,
      title: "This amazing album",
      published: false,
      authorId: 113431,
      content: "This amazing album is truly amazing right?",
      createdAt: null,
      updatedAt: null,
    };
    await expect(updateReview(updatedReview)).resolves.toEqual(updatedReview);
  });

  test("Should get all reviews ", async () => {
    const review: Review = {
      id: 138479,
      album: "When You Find Out",
      artist: "Hotline TNT",
      genre: "Showgaze",
      rating: 5,
      title: "Wow! This stuff bangs!",
      published: false,
      authorId: 113431,
      content: "This amazing album is truly amazing",
      createdAt: null,
      updatedAt: null,
    };
    await createReview(review);

    await expect(getAllReview()).resolves.toHaveLength(2);
  });

  test("Should get review by ID ", async () => {
    await expect(getReviewById(138479)).resolves.toEqual({
      id: 138479,
      album: "When You Find Out",
      artist: "Hotline TNT",
      genre: "Showgaze",
      rating: 5,
      title: "Wow! This stuff bangs!",
      published: false,
      authorId: 113431,
      content: "This amazing album is truly amazing",
      createdAt: null,
      updatedAt: null,
    });
  });

  afterAll(async () => {
    await deleteReview(138478);
    await deleteReview(138479);
    await deleteUser(113431);
  });
});

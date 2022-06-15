import app from "../../src/app";
import supertest from "supertest";
import { Review, User } from "../../src/models/_index";
import * as reviewsDao from "../../src/data/dao/reviews.dao";
import * as usersDao from "../../src/data/dao/users.dao";

const request = supertest(app);

const user: User = {
  id: undefined,
  email: "john@example.com",
  password: "123456",
  username: "johnny",
};

const review: Review = {
  album: "Flower Boy",
  artist: "Tyler, the Creator",
  genre: "Hip Hop",
  rating: 5,
  title: "This amazing album",
  published: false,
  authorId: 113431,
  content: "This amazing album is truly amazing",
};

let token: string;
let authorId: number;
let reviewId: number;

describe("Review routes", () => {
  beforeAll(async () => {
    await request.post("/auth/signup").set("Accept", "application/json").send({
      email: user.email,
      password: user.password,
      username: user.username,
    });

    const loggedUser = await request
      .post("/auth/login")
      .set("Accept", "application/json")
      .send({
        username: user.username,
        password: user.password,
      });

    token = loggedUser.body.token;
    authorId = loggedUser.body.user.id;
  });

  test("Should create review", async () => {
    await request
      .post("/review")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        album: review.album,
        artist: review.artist,
        genre: review.genre,
        rating: review.rating,
        title: review.title,
        published: review.published,
        authorId: authorId,
        content: review.content,
      })
      .expect((res) => {
        reviewId = res.body.id;
        res.body = review;
        res.status = 201;
      });
  });

  afterAll(async () => {
    await reviewsDao.deleteReview(reviewId);
    await usersDao.deleteUser(authorId);
  });
});

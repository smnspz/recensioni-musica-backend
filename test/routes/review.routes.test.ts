import app from "../../src/app";
import supertest from "supertest";
import { Review, User } from "../../src/models/_index";
import * as reviewsDao from "../../src/data/dao/reviews.dao";
import * as usersDao from "../../src/data/dao/users.dao";

const request = supertest(app);

const user: User = {
  email: "john@example.com",
  password: "123456",
  username: "johnny",
};

const secondUser: User = {
  email: "mario@rossi.it",
  password: "123456",
  username: "mario",
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
let secondToken: string;
let authorId: number;
let reviewId: number;
let secondAuthorId: number;

describe("Review routes", () => {
  beforeAll(async () => {
    await request.post("/auth/signup").set("Accept", "application/json").send({
      email: user.email,
      password: user.password,
      username: user.username,
    });

    await request.post("/auth/signup").set("Accept", "application/json").send({
      email: secondUser.email,
      password: secondUser.password,
      username: secondUser.username,
    });

    const loggedUser = await request
      .post("/auth/login")
      .set("Accept", "application/json")
      .send({
        username: user.username,
        password: user.password,
      });

    const loggedSecondUser = await request
      .post("/auth/login")
      .set("Accept", "application/json")
      .send({
        username: secondUser.username,
        password: secondUser.password,
      });

    token = loggedUser.body.token;
    authorId = loggedUser.body.user.id;
    secondToken = loggedSecondUser.body.token;
    secondAuthorId = loggedSecondUser.body.user.id;
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

  test("Should update review ", async () => {
    await request
      .put(`/review/${reviewId}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        album: review.album,
        artist: review.artist,
        genre: "Rap",
        rating: review.rating,
        title: review.title,
        published: review.published,
        authorId: authorId,
        content: review.content,
      })
      .expect((res) => {
        res.body = review;
        res.status = 200;
      });
  });

  test("Should not be able to update review of another user", async () => {
    await request
      .put(`/review/${reviewId}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${secondToken}`)
      .send({
        album: review.album,
        artist: review.artist,
        genre: "Rap",
        rating: review.rating,
        title: review.title,
        published: review.published,
        authorId: secondAuthorId,
        content: review.content,
      })
      .expect((res) => {
        res.body = {
          message: "You are not authorized to perform this action",
        };
        res.status = 401;
      });
  });

  afterAll(async () => {
    await reviewsDao.deleteReview(reviewId);
    await usersDao.deleteUser(authorId);
  });
});

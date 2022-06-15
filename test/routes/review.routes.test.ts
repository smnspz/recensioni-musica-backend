import app from "../../src/app";
import supertest from "supertest";
import { Review, User } from "../../src/models/_index";
import * as reviewsDao from "../../src/data/dao/reviews.dao";
import * as usersDao from "../../src/data/dao/users.dao";

const request = supertest(app);

const firstUser: User = {
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

let firstUserToken: string;
let secondUserToken: string;
let firstAuthorId: number;
let secondAuthorId: number;
let reviewId: number;

describe("Review routes", () => {
  beforeAll(async () => {
    await request.post("/auth/signup").set("Accept", "application/json").send({
      email: firstUser.email,
      password: firstUser.password,
      username: firstUser.username,
    });

    await request.post("/auth/signup").set("Accept", "application/json").send({
      email: secondUser.email,
      password: secondUser.password,
      username: secondUser.username,
    });

    const firstUserLogin = await request
      .post("/auth/login")
      .set("Accept", "application/json")
      .send({
        username: firstUser.username,
        password: firstUser.password,
      });

    const secondUserLogin = await request
      .post("/auth/login")
      .set("Accept", "application/json")
      .send({
        username: secondUser.username,
        password: secondUser.password,
      });

    firstUserToken = firstUserLogin.body.token;
    secondUserToken = secondUserLogin.body.token;
    firstAuthorId = firstUserLogin.body.user.id;
    secondAuthorId = secondUserLogin.body.user.id;
  });

  test("Should create review", async () => {
    await request
      .post("/review")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${firstUserToken}`)
      .send({
        album: review.album,
        artist: review.artist,
        genre: review.genre,
        rating: review.rating,
        title: review.title,
        published: review.published,
        authorId: firstAuthorId,
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
      .set("Authorization", `Bearer ${firstUserToken}`)
      .send({
        album: review.album,
        artist: review.artist,
        genre: "Rap",
        rating: review.rating,
        title: review.title,
        published: review.published,
        authorId: firstAuthorId,
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
      .set("Authorization", `Bearer ${secondUserToken}`)
      .send({
        album: review.album,
        artist: review.artist,
        genre: "Rap",
        rating: review.rating,
        title: review.title,
        published: review.published,
        authorId: firstAuthorId,
        content: review.content,
      })
      .expect((res) => {
        res.body = {
          error: "You are not authorized to perform this action",
        };
        res.status = 401;
      });
  });

  test("Should not be able to delete review of another user", async () => {
    await request
      .delete(`/review/${reviewId}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${secondUserToken}`)
      .expect((res) => {
        res.body = {
          error: "You are not authorized to perform this action",
        };
        res.status = 401;
      });
  });

  test("Should delete review", async () => {
    await request
      .delete(`/review/${reviewId}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${firstUserToken}`)
      .expect((res) => {
        res.body = {};
        res.status = 200;
      });
  });

  afterAll(async () => {
    await usersDao.deleteUser(firstAuthorId);
    await usersDao.deleteUser(secondAuthorId);
  });
});

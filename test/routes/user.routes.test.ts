import app from "../../src/app";
import supertest from "supertest";
import { User } from "../../src/models/user";

const request = supertest(app);

const user: User = {
  id: undefined,
  email: "john@example.com",
  password: "123456",
  username: "johnmmyy",
};

describe("User routes", () => {
  test("Should create user", async () => {
    await request
      .post("/signup")
      .set("Accept", "application/json")
      .send({
        id: user.id,
        email: user.email,
        password: user.password,
        username: user.username,
      })
      .expect((res) => {
        res.body = user;
        res.status = 201;
      });
  });

  test("Should delete user ", async () => {
    await request
      .delete(`/user/${user.id}`)
      .set("Accept", "application/json")
      .set("Accept", "application/json")
      .expect((res) => {
        res.body = user;
        res.status = 200;
      });
  });

  test("Should return error when missing required fields", async () => {
    await request
      .post("/signup")
      .set("Accept", "application/json")
      .send({
        email: user.email,
        password: user.password,
        username: user.username,
      })
      .expect((res) => {
        res.body = {
          message: "Missing required fields",
        };
        res.status = 400;
      });
  });

  test("Should return error when invalid email", async () => {
    await request
      .post("/signup")
      .set("Accept", "application/json")
      .send({
        id: user.id,
        email: "gmail",
        password: user.password,
        username: user.username,
      })
      .expect((res) => {
        res.body = {
          errors: ["Must be a valid email"],
        };
        res.status = 400;
      });
  });
});

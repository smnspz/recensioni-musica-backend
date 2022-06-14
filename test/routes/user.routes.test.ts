import app from "../../src/app";
import supertest from "supertest";
import { User } from "../../src/models/user";

const request = supertest(app);

const user: User = {
  id: undefined,
  email: "john@example.com",
  password: "123456",
  username: "johnny",
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
    const userToDelete = await (
      await request.get(`/user/${user.username}`)
    ).body.id;

    await request
      .delete(`/user/${userToDelete}`)
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

  test("Should return the user ", async () => {
    await request
      .get(`/user/${user.username}`)
      .set("Accept", "application/json")
      .expect((res) => {
        res.body = user;
        res.status = 200;
      });
  });

  test("Should return error when email already exists", async () => {
    await request.post("/signup").send(user);
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
        res.body = {
          errors: ["Email already exists"],
        };
        res.status = 400;
      });
  });

  test("Should return JWT ", async () => {
    await request.post("/signup").send({
      email: "test@test.com",
      password: user.password,
      username: "test_username",
    });

    await request
      .post("/login")
      .set("Accept", "application/json")
      .send({
        username: "test_username",
        password: user.password,
      })
      .expect((res) => {
        res.body = {
          token: res.body.token,
        };
        res.status = 200;
      });
  });
});

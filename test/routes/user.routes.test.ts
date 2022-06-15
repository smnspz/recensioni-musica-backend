import app from "../../src/app";
import supertest from "supertest";
import { User } from "../../src/models/_index";

const request = supertest(app);

const user: User = {
  id: undefined,
  email: "john@example.com",
  password: "123456",
  username: "johnny",
};

let token: String = "";

describe("User routes", () => {
  test("Should create user", async () => {
    await request
      .post("/auth/signup")
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

  test("Should login ", async () => {
    await request
      .post("/auth/login")
      .set("Accept", "application/json")
      .send({
        username: user.username,
        password: user.password,
      })
      .expect((res) => {
        token = res.body.token;
        res.body = {
          token: res.body.token,
        };
        res.status = 200;
      });
  });

  test("Should delete user ", async () => {
    const userToDelete = await request
      .get(`/user/${user.username}`)
      .set("Authorization", `Bearer ${token}`);

    await request
      .delete(`/user/${userToDelete.body.id}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect((res) => {
        res.body = user;
        res.status = 200;
      });
  });

  test("Should return error when missing required fields", async () => {
    await request
      .post("/auth/signup")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
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
      .post("/auth/signup")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
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
      .set("Authorization", `Bearer ${token}`)
      .expect((res) => {
        res.body = user;
        res.status = 200;
      });
  });

  test("Should return error when email already exists", async () => {
    await request.post("/signup").send(user);
    await request
      .post("/auth/signup")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
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

  afterAll(async () => {
    const userToDelete = await request
      .get(`/user/${user.username}`)
      .set("Authorization", `Bearer ${token}`);
    await request
      .delete(`/user/${userToDelete.body.id}`)
      .set("Authorization", `Bearer ${token}`);
  });
});

import app from "../../src/app";
import supertest from "supertest";
import { User } from "@prisma/client";

const request = supertest(app);

const user: User = {
  id: 141398,
  email: "john@example.com",
  password: "123456",
  username: "johnnyexample",
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
});

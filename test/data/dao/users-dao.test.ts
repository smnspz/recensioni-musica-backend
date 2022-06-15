import * as dao from "../../../src/data/dao/users.dao";
import { User } from "@prisma/client";

const user: User = {
  id: 145143,
  email: "john@appleseed.com",
  password: "12345678",
  username: "John",
};

const newUser: User = {
  id: 145144,
  email: "franklin@theturtle.com",
  password: "12345678",
  username: "Franklin",
};

describe("UserDao tests", () => {
  test("Should create new user ", async () => {
    await expect(dao.createUser(user)).resolves.toEqual(user);
  });

  test("Should update username ", async () => {
    const updatedUser: User = {
      id: 145143,
      email: "john@appleseed.com",
      password: "12345678",
      username: "John Appleseed",
    };

    await expect(dao.updateUser(updatedUser)).resolves.toEqual(updatedUser);
  });

  test("Should get all users ", async () => {
    await dao.createUser(newUser);
    await expect((await dao.getAllUsers()).length).toBeGreaterThan(1);
  });

  test("Should get user by ID ", async () => {
    await expect(dao.getUserById(145144)).resolves.toEqual({
      id: 145144,
      email: "franklin@theturtle.com",
      password: "12345678",
      username: "Franklin",
    });
  });

  test("Should get user by email ", async () => {
    await expect(dao.getUserByEmail(newUser.email)).resolves.toStrictEqual(
      newUser
    );
  });

  test("Should delete user ", async () => {
    const userToDelete: User = {
      id: 145144,
      email: "franklin@theturtle.com",
      password: "12345678",
      username: "Franklin",
    };

    await expect(dao.deleteUser(145144)).resolves.toStrictEqual(userToDelete);
  });

  afterAll(async () => {
    await dao.deleteUser(145143);
  });
});

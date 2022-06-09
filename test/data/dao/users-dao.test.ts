import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../../../src/data/dao/users-dao";
import { User } from "@prisma/client";

describe("UserDao tests", () => {
  test("Should create new user ", async () => {
    const user: User = {
      id: 145143,
      email: "john@appleseed.com",
      password: "12345678",
      username: "John",
    };

    await expect(createUser(user)).resolves.toEqual(user);
  });

  test("Should update username ", async () => {
    const updatedUser: User = {
      id: 145143,
      email: "john@appleseed.com",
      password: "12345678",
      username: "John Appleseed",
    };

    await expect(updateUser(updatedUser)).resolves.toEqual(updatedUser);
  });

  test("Should get all users ", async () => {
    const newUser: User = {
      id: 145144,
      email: "franklin@theturtle.com",
      password: "12345678",
      username: "Franklin",
    };

    await createUser(newUser);
    await expect(getAllUsers()).resolves.toHaveLength(2);
  });

  test("Should get user by ID ", async () => {
    await expect(getUserById(145144)).resolves.toEqual({
      id: 145144,
      email: "franklin@theturtle.com",
      password: "12345678",
      username: "Franklin",
    });
  });

  test("Should delete user ", async () => {
    const userToDelete: User = {
      id: 145144,
      email: "franklin@theturtle.com",
      password: "12345678",
      username: "Franklin",
    };

    await expect(deleteUser(145144)).resolves.toStrictEqual(userToDelete);
  });

  afterAll(async () => {
    await deleteUser(145143);
  });
});

import { prismaMock } from "../setup/singleton";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../../../src/data/dao/users-dao";

describe("UserDao tests", () => {
  test("Should create new user ", async () => {
    const user = {
      id: 145143,
      email: "john@appleseed.com",
      password: "12345678",
      username: "John",
    };

    prismaMock.user.create.mockResolvedValue(user);

    await expect(createUser(user)).resolves.toEqual(user);
  });

  test("Should update username ", async () => {
    const updatedUser = {
      id: 145143,
      email: "john@appleseed.com",
      password: "12345678",
      username: "John Appleseed",
    };

    prismaMock.user.update.mockResolvedValue(updatedUser);

    await expect(updateUser(updatedUser)).resolves.toEqual({
      id: 145143,
      email: "john@appleseed.com",
      password: "12345678",
      username: "John Appleseed",
    });
  });

  test("Should get all users ", async () => {
    const newUser = {
      id: 145144,
      email: "franklin@theturtle.com",
      password: "12345678",
      username: "Franklin",
    };

    prismaMock.user.create.mockResolvedValue(newUser);
    await expect(createUser(newUser)).resolves.toEqual(newUser);
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
    const usersToDelete = [
      {
        id: 145143,
        email: "john@appleseed.com",
        password: "12345678",
        username: "John Appleseed",
      },
      {
        id: 145144,
        email: "franklin@theturtle.com",
        password: "12345678",
        username: "Franklin",
      },
    ];

    prismaMock.user.delete.mockResolvedValue(usersToDelete[0]);
    await expect(deleteUser(145143)).resolves.toStrictEqual(usersToDelete[0]);

    prismaMock.user.delete.mockResolvedValue(usersToDelete[1]);
    await expect(deleteUser(145144)).resolves.toStrictEqual(usersToDelete[1]);
  });
});

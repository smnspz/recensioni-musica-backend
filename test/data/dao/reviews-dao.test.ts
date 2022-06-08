import { prismaMock } from "../setup/singleton";
import { createUser, updateUser } from "../../../src/data/dao/users-dao";

test("Should create new user ", async () => {
  const user = {
    id: 1,
    email: "john@appleseed.com",
    password: "12345678",
    username: "John",
  };

  prismaMock.user.create.mockResolvedValue(user);

  await expect(createUser(user)).resolves.toEqual({
    id: 1,
    email: "john@appleseed.com",
    password: "12345678",
    username: "John",
  });
});

test("Should update username", async () => {
  const updatedUser = {
    id: 1,
    email: "john@appleseed.com",
    password: "12345678",
    username: "John Appleseed",
  };

  prismaMock.user.update.mockResolvedValue(updatedUser);

  await expect(updateUser(updatedUser)).resolves.toEqual({
    id: 1,
    email: "john@appleseed.com",
    password: "12345678",
    username: "John Appleseed",
  });
});

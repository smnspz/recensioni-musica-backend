import { prismaMock } from "../setup/singleton";
import { createUser } from "../../../src/data/dao/users-dao";

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

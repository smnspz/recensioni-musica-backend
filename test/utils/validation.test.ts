import { User } from "@prisma/client";
import { ValidationError } from "yup";
import { validateUser } from "../../src/utils/validation";

describe("Validation tests", () => {
  let user: User = {
    id: 141398,
    email: "john@example.com",
    password: "123456",
    username: "johnnyexample",
  };

  test("Should return a valid user", async () => {
    const validatedUser = await validateUser(user);
    expect(validatedUser).toEqual(user);
  });
});

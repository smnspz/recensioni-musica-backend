import { User } from "@prisma/client";
import { emailRegex } from "../utils/regex";
import bcrypt from "bcrypt";

export const makeCreateUser = async (user: User): Promise<User> => {
  const { email, password, username } = user;

  if (!email || !password || !username) {
    throw new Error("Missing required fields");
  }
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }
  if (username.length < 3) {
    throw new Error("Username must be at least 3 characters");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return {
    id: user.id,
    email: user.email,
    password: hashedPassword,
    username: user.username,
  };
};

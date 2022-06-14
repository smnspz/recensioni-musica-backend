import { User } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const makeCreateUser = async (user: User): Promise<User> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  return {
    id: user.id,
    email: user.email,
    password: hashedPassword,
    username: user.username,
  };
};

export const comparePasswords = async (
  userToLogin: string,
  userToCompare: string
): Promise<Boolean> => {
  return await bcrypt.compare(userToLogin, userToCompare);
};

export const createJwt = (user: User) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_TOKEN_KEY || "",
    {
      expiresIn: process.env.JWT_DURATION,
    }
  );
};
export const refreshJwt = (user: User) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.REFRESH_TOKEN_KEY || "",
    {
      expiresIn: process.env.JWT_DURATION,
    }
  );
};

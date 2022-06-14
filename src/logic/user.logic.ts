import { User } from "../models/user";
import bcrypt from "bcrypt";

export const makeCreateUser = async (user: User): Promise<User> => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  return {
    id: user.id,
    email: user.email,
    password: hashedPassword,
    username: user.username,
  };
};

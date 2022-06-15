import { User } from "../models/_index.js";
import * as yup from "yup";

export const validateUser = async (user: User) => {
  const schema: yup.SchemaOf<User> = yup.object({
    id: yup.number(),
    email: yup.string().email("Must be a valid email").required(),
    password: yup.string().min(6, "Must have at least 6 characters").required(),
    username: yup.string().min(3, "Must have at least 3 characters").required(),
  });

  return await schema.validate(user);
};

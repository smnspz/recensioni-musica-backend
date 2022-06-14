import { Request, Response } from "express";
import { ValidationError } from "yup";
import * as dao from "../data/dao/users.dao";
import {
  makeCreateUser,
  comparePasswords,
  createJwt,
  refreshJwt,
} from "../logic/user.logic";
import { User } from "../models/user";
import { validateUser } from "../utils/validation";

export const createUser = async (req: Request, res: Response) => {
  try {
    const validatedUser = await validateUser(req.body);

    const emailExists = await dao.getUserByEmail(req.body.email);
    const usernameExists = await dao.getUserByUsername(req.body.username);
    if (emailExists) {
      throw new ValidationError("User already exists");
    } else if (usernameExists) {
      throw new ValidationError("Email already exists");
    }

    const user = await makeCreateUser(validatedUser);
    const result = await dao.createUser(user);
    return res.json(result);
  } catch (e: any) {
    if (e instanceof ValidationError) {
      return res.status(400).send({ errors: e.errors });
    }
    return res
      .status(500)
      .send({ errors: "Something went wrong on our end :(" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const validatedUser = await validateUser(req.body);

    const emailExists = await dao.getUserByEmail(req.body.email);
    const usernameExists = await dao.getUserByUsername(req.body.username);
    if (emailExists) {
      throw new ValidationError("User already exists");
    } else if (usernameExists) {
      throw new ValidationError("Email already exists");
    }

    const user = await makeCreateUser(validatedUser);
    const result = await dao.updateUser(user);
    return res.json(result);
  } catch (e: any) {
    if (e in ValidationError) {
      return res.status(400).send({ errors: e.errors });
    }
    return res
      .status(500)
      .send({ message: "Something went wrong on our end :(" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  const result = await dao.getAllUsers();
  return res.json(result);
};

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await dao.getUserById(Number(id));
  return res.json(result);
};

export const getUserByUsername = async (req: Request, res: Response) => {
  const username = req.params.username;
  const result = await dao.getUserByUsername(username);
  return res.json(result);
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await dao.deleteUser(Number(id));
  return res.json(result);
};

export const login = async (req: Request, res: Response) => {
  const { username, password }: User = req.body;
  const user = await dao.getUserByUsername(username);
  if (!user) {
    return res.status(400).send({ message: "User not found" });
  }
  const validCredentials = await comparePasswords(password, user.password);
  if (!validCredentials) {
    return res.status(400).send({ message: "Invalid credentials" });
  }

  const token = createJwt(user);
  const refreshToken = refreshJwt(user);

  res.send({
    token,
    tokenExpiresIn: process.env.JWT_DURATION,
    refreshToken,
    refreshTokenExpiresIn: process.env.REFRESH_EXPIRES_IN,
  });
};

import { Request, Response } from "express";
import { ValidationError } from "yup";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../data/dao/users.dao";
import { makeCreateUser } from "../logic/user.logic";
import { validateUser } from "../utils/validation";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const validatedUser = await validateUser(req.body);
    const user = await makeCreateUser(validatedUser);
    const result = await createUser(user);
    return res.json(result);
  } catch (e: any) {
    return res.status(400).send({ errors: e.errors });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  const user = req.body;
  const result = await updateUser(user);
  return res.json(result);
};

export const getAllUsersController = async (req: Request, res: Response) => {
  const result = await getAllUsers();
  return res.json(result);
};

export const getUserByIdController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await getUserById(Number(id));
  return res.json(result);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await deleteUser(Number(id));
  return res.json(result);
};

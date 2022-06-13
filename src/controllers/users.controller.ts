import { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../data/dao/users.dao";
import { makeCreateUser } from "../logic/user.logic";

export const createUserController = async (req: Request, res: Response) => {
  const user = await makeCreateUser(req.body);
  const result = await createUser(user);
  return res.json(result);
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

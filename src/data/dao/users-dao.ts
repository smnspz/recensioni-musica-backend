import { User } from "../../../src/models/user";
import { Request, Response } from "express";
import prisma from "../db/prisma-client";

export async function getAllUsers(req: Request, res: Response) {
  const users = await prisma.user.findMany();
  return res.json(users);
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  return res.json(user);
}

export async function createUser(user: User) {
  console.log(user);
  return await prisma.user.create({ data: user });
}

export async function updateUser(user: User) {
  return await prisma.user.update({
    where: {
      id: user.id,
    },
    data: user,
  });
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  return res.json(user);
}

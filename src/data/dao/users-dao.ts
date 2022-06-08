import { Request, Response } from "express";

export async function getAllUsers(req: Request, res: Response) {
  const users = await prisma?.user.findMany();
  return res.json(users);
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;
  const user = await prisma?.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  return res.json(user);
}

export async function createUser(req: Request, res: Response) {
  const { email, password, username } = req.body;
  const user = await prisma?.user.create({
    data: {
      email,
      password,
      username,
    },
  });
  return res.json(user);
}

export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const { email, password, username } = req.body;
  const user = await prisma?.user.update({
    where: {
      id: Number(id),
    },
    data: {
      email,
      password,
      username,
    },
  });
  return res.json(user);
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  const user = await prisma?.user.delete({
    where: {
      id: Number(id),
    },
  });
  return res.json(user);
}

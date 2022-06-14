// import { User } from "@prisma/client";
import { User } from "../../models/user";
import prisma from "../db/prisma-client";

export const getAllUsers = async () => await prisma.user.findMany();

export const getUserById = async (id: number) =>
  await prisma.user.findUnique({ where: { id } });

export const getUserByUsername = async (username: string) => {
  return await prisma.user.findUnique({ where: { username } });
};

export const getUserByEmail = async (email: string) =>
  await prisma.user.findUnique({ where: { email } });

export const createUser = async (user: User) =>
  await prisma.user.create({ data: user });

export const updateUser = async (user: User) => {
  return await prisma.user.update({
    where: {
      id: user.id,
    },
    data: user,
  });
};

export const deleteUser = async (id: number) =>
  await prisma.user.delete({ where: { id } });

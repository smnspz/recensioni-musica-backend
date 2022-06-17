import { Profile } from "../../models/_index.js";
import prisma from "../db/prisma-client.js";

export const getAllProfiles = async () => await prisma.profile.findMany();

export const getProfileById = async (id: number) =>
  await prisma.profile.findUnique({ where: { id } });

export const createProfile = async (profile: Profile) =>
  await prisma.profile.create({ data: profile });

export const updateProfile = async (id: number, profile: Profile) => {
  return await prisma.profile.update({
    where: {
      id: profile.id,
    },
    data: profile,
  });
};

export const deleteProfile = async (id: number) =>
  await prisma.profile.delete({ where: { id: id } });

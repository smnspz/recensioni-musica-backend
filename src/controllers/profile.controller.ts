import * as dao from "../data/dao/profiles.dao.js";
import { Request, Response } from "express";
import { canUserModify } from "../logic/review.logic.js";

export const createProfile = async (req: Request, res: Response) => {
  try {
    const newProfile = await dao.createProfile(req.body);
    return res.json(newProfile);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ message: "Something went wrong on our end :(" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    if (canUserModify(token!, req.body.userId)) {
      const id = Number(req.params.id);
      const updatedProfile = await dao.updateProfile(id, req.body);
      return res.json(updatedProfile);
    }
    return res
      .status(401)
      .send({ error: "You are not authorized to perform this action" });
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Something went wrong on our end :(" });
  }
};

export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    if (canUserModify(token!, req.body.userId)) {
      const id = Number(req.params.id);
      const deletedProfile = await dao.deleteProfile(id);
      return res.json(deletedProfile);
    }
    return res
      .status(401)
      .send({ error: "You are not authorized to perform this action" });
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Something went wrong on our end :(" });
  }
};

export const getAllProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await dao.getAllProfiles();
    return res.json(profiles);
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Something went wrong on our end :(" });
  }
};

export const getProfileById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const profile = await dao.getProfileById(id);
    return res.json(profile);
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Something went wrong on our end :(" });
  }
};

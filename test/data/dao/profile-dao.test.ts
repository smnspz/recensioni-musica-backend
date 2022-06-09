import { Profile, User } from "@prisma/client";
import { createUser, deleteUser } from "../../../src/data/dao/users-dao";
import {
  createProfile,
  deleteProfile,
  getAllProfile,
  getProfileById,
  updateProfile,
} from "../../../src/data/dao/profiles-dao";

describe("ProfilesDao tests", () => {
  beforeAll(async () => {
    const user: User = {
      id: 113431,
      username: "John Doe",
      email: "john@doe.com",
      password: "123456",
    };
    await createUser(user);

    const secondUser: User = {
      id: 113432,
      username: "John Muffin",
      email: "john@muffin.com",
      password: "123456",
    };
    await createUser(secondUser);
  });

  test("Should create new profile ", async () => {
    const profile: Profile = {
      id: 754923,
      bio: "I'm a great person",
      profilePic: null,
      userId: 113431,
    };
    await expect(createProfile(profile)).resolves.toEqual(profile);
  });

  test("Should update existing profile ", async () => {
    const updatedProfile: Profile = {
      id: 754923,
      bio: "I'm a bad person",
      profilePic: null,
      userId: 113431,
    };
    await expect(updateProfile(updatedProfile)).resolves.toEqual(
      updatedProfile
    );
  });

  test("Should get all profiles ", async () => {
    const profile: Profile = {
      id: 754924,
      bio: "I'm a terrible person",
      profilePic: null,
      userId: 113432,
    };
    await createProfile(profile);

    await expect(getAllProfile()).resolves.toHaveLength(2);
  });

  test("Should get profile by ID ", async () => {
    await expect(getProfileById(754924)).resolves.toEqual({
      id: 754924,
      bio: "I'm a terrible person",
      profilePic: null,
      userId: 113432,
    });
  });

  afterAll(async () => {
    await deleteProfile(754923);
    await deleteProfile(754924);
    await deleteUser(113431);
    await deleteUser(113432);
  });
});

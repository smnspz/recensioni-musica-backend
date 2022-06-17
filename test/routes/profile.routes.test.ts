import app from "../../src/app";
import supertest from "supertest";
import { Profile, Review, User } from "../../src/models/_index";
import * as profilesDao from "../../src/data/dao/profiles.dao";
import * as usersDao from "../../src/data/dao/users.dao";

const request = supertest(app);

const firstUser: User = {
  email: "john@example.com",
  password: "123456",
  username: "johnny",
};

const secondUser: User = {
  email: "mario@rossi.it",
  password: "123456",
  username: "mario",
};

let firstUserToken: string;
let secondUserToken: string;
let firstUserId: number;
let secondUserId: number;
let profileId: number;

describe("Profile routes", () => {
  beforeAll(async () => {
    await request.post("/auth/signup").set("Accept", "application/json").send({
      email: firstUser.email,
      password: firstUser.password,
      username: firstUser.username,
    });

    await request.post("/auth/signup").set("Accept", "application/json").send({
      email: secondUser.email,
      password: secondUser.password,
      username: secondUser.username,
    });

    const firstUserLogin = await request
      .post("/auth/login")
      .set("Accept", "application/json")
      .send({
        username: firstUser.username,
        password: firstUser.password,
      });

    const secondUserLogin = await request
      .post("/auth/login")
      .set("Accept", "application/json")
      .send({
        username: secondUser.username,
        password: secondUser.password,
      });

    firstUserToken = firstUserLogin.body.token;
    secondUserToken = secondUserLogin.body.token;
    firstUserId = firstUserLogin.body.user.id;
    secondUserId = secondUserLogin.body.user.id;
  });

  test("Should create profile ", async () => {
    const profile: Profile = {
      userId: firstUserId,
      bio: "I am a test profile",
      profilePic: "https://www.google.com/img/logo_home_jumbo.png",
    };

    await request
      .post("/profile")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${firstUserToken}`)
      .send({
        userId: profile.userId,
        bio: profile.bio,
        profilePic: profile.profilePic,
      })
      .expect((res) => {
        profileId = res.body.id;
        expect(res.body.userId).toBe(firstUserId);
        expect(res.body.bio).toBe(profile.bio);
        expect(res.body.profilePic).toBe(profile.profilePic);
      });
  });

  test("Should get profile by id ", async () => {
    await request
      .get(`/profile/${profileId}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${firstUserToken}`)
      .expect((res) => {
        expect(res.body.userId).toBe(firstUserId);
        expect(res.body.bio).toBe("I am a test profile");
        expect(res.body.profilePic).toBe(
          "https://www.google.com/img/logo_home_jumbo.png"
        );
      });
  });

  /*     test("Should get all profiles", async () => {
            await request
                .post("/profile")
                .set("Accept", "application/json")
                .set("Authorization", `Bearer ${firstUserToken}`)
                .send({
                    userId: firstUserId,
                    bio: "I am a test profile",
                    profilePic: "https://www.google.com/img/logo_home_jumbo.png",
                })
                .expect((res) => {
                    console.log(res.body)
                    expect(res.body.userId).toBe(firstUserId);
                    expect(res.body.bio).toBe("I am second test profile");
                    expect(res.body.profilePic).toBe("https://www.google.com/img/logo_home_jumbo.png");
                });
    
            await request
                .get("/profile")
                .set("Accept", "application/json")
                .set("Authorization", `Bearer ${firstUserToken}`)
                .expect((res) => {
                    console.log(res.body);
                    expect(res.body.length).toBe(2);
                });
        }) */
});

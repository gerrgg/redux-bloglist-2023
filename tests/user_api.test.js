const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const User = require("../models/user");

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await helper.createUsers(helper.initialUsers);
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username must be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("valid users can login", async () => {
    const users = await helper.usersInDb();

    const loginBody = { username: users[0].username, password: "password" };

    const result = await api
      .post("/api/login")
      .send(loginBody)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(result.body.token).toBeDefined();
  });

  test("invalid users cannnot login", async () => {
    const users = await helper.usersInDb();

    const loginBody = {
      username: users[0].username,
      password: "wrongpassword",
    };

    await api
      .post("/api/login")
      .send(loginBody)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });

  test("returns 400 if username is less than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "a",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAfter = await helper.usersInDb();

    expect(usersAfter.length).toBe(usersAtStart.length);
  });

  test("returns 400 if password is less than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "newname",
      name: "Superuser",
      password: "1",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAfter = await helper.usersInDb();

    expect(usersAfter.length).toBe(usersAtStart.length);
  });
});

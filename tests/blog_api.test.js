const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const Blog = require("../models/blogs");

beforeEach(async () => {
  await Blog.deleteMany({});
  await helper.createBlogs(helper.initialBlogs);
  await helper.createUsers(helper.initialUsers);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("a specific blog is within the returned blog", async () => {
  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.title);
  expect(contents).toContain("HTML is hard");
});

test("a blog post can be added", async () => {
  const newBlog = { ...helper.initialBlogs[0], title: "new title" };
  const token = await helper.getValidToken();

  await api
    .post("/api/blogs")
    .set("Authorization", "Bearer " + token)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);

  const titles = response.body.map((b) => b.title);
  expect(titles).toContain("new title");
});

test("returns 401 when adding blog post without authorization", async () => {
  const newBlog = { ...helper.initialBlogs[0], title: "new title" };

  await api.post("/api/blogs").send(newBlog).expect(401);
});

test("a blogs likes default to 0 when omitted on save", async () => {
  const token = await helper.getValidToken();
  const newBlog = {
    title: "New Title",
    author: "Jim",
    url: "http://greg.com",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", "Bearer " + token)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const mostRecent = response.body[response.body.length - 1];

  expect(mostRecent.likes).toBe(0);
});

test("blog without title is not added", async () => {
  const newblog = {
    author: "sometitle",
    likes: 12,
    url: "http://someurl.com",
  };

  const token = await helper.getValidToken();

  await api
    .post("/api/blogs")
    .send(newblog)
    .set("Authorization", "Bearer " + token)
    .expect(400);

  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("blog without url returns 400", async () => {
  const newblog = {
    title: "New title",
    author: "sometitle",
  };

  const token = await helper.getValidToken();

  await api
    .post("/api/blogs")
    .set("Authorization", "Bearer " + token)
    .send(newblog)
    .expect(400);

  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("a specific blog can be viewed", async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blogToView = blogsAtStart[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

  expect(resultBlog.body).toEqual(processedBlogToView);
});

test("deleting a blog without authorization returns 401", async () => {
  const newBlog = { ...helper.initialBlogs[0], title: "new title" };
  const token = await helper.getValidToken();

  const response = await api
    .post("/api/blogs")
    .set("Authorization", "Bearer " + token)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  await api.delete(`/api/blogs/${response.body.id}`).expect(401);
});

test("a user deleting thier own blog returns 204", async () => {
  const newBlog = { ...helper.initialBlogs[0], title: "new title" };
  const token = await helper.getValidToken();

  const response = await api
    .post("/api/blogs")
    .set("Authorization", "Bearer " + token)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  await api
    .delete(`/api/blogs/${response.body.id}`)
    .set("Authorization", "Bearer " + token)
    .expect(204);
});

test("a blog can be updated", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const updatedBlog = { ...blogsAtStart[0], likes: 10 };

  const response = await api
    .put(`/api/blogs/${updatedBlog.id}`)
    .send(updatedBlog)
    .expect(200);

  expect(response.body.likes).toBe(updatedBlog.likes);
});

afterAll(() => {
  mongoose.connection.close();
});

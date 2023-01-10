const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const Blog = require("../models/blogs");
const Comment = require("../models/comments");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Comment.deleteMany({});
  await helper.createBlogs(helper.initialBlogs);
});

test("comments are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("comments can be added to blogs", async () => {
  const blogs = await helper.blogsInDb();
  const blog = blogs[0];

  expect(blog.comments.length).toBe(0);

  const commentsBefore = await helper.commentsInDb();

  expect(commentsBefore.length).toBe(0);

  const comment = {
    content: "test comment",
    blog: blog.id,
  };

  await api
    .post("/api/comments")
    .send(comment)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const commentsAfter = await helper.commentsInDb();

  expect(commentsAfter.length).toBe(1);

  expect(commentsAfter[0].blog).toBeDefined();

  const blogsAfterComment = await helper.blogsInDb();

  expect(blogsAfterComment[0].comments.length).toBe(1);
});

test("comments can be added to blogs via blog endpoint", async () => {
  const blogs = await helper.blogsInDb();
  const blog = blogs[0];

  expect(blog.comments.length).toBe(0);

  const commentsBefore = await helper.commentsInDb();

  expect(commentsBefore.length).toBe(0);

  const comment = {
    content: "test comment",
  };

  await api
    .post(`/api/blogs/${blog.id}/comment`)
    .send(comment)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const commentsAfter = await helper.commentsInDb();

  expect(commentsAfter.length).toBe(1);

  expect(commentsAfter[0].blog).toBeDefined();

  const blogsAfterComment = await helper.blogsInDb();

  expect(blogsAfterComment[0].comments.length).toBe(1);
});

afterAll(() => {
  mongoose.connection.close();
});

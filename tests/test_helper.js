const Blog = require("../models/blogs");
const User = require("../models/user");
const Comment = require("../models/comments");

const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");
const { response } = require("../app");
const api = supertest(app);

const initialBlogs = [
  {
    title: "HTML is easy",
    author: "Greg B",
    url: "http://greg.com",
    likes: 1,
    comments: [],
  },
  {
    title: "HTML is hard",
    author: "Greg B",
    url: "http://greg.com",
    likes: 15,
    comments: [],
  },
];

const initialUsers = [
  {
    username: "root",
    name: "joe",
  },
  {
    username: "junior",
    name: "dan",
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: "willremovethissoon" });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const commentsInDb = async () => {
  const comments = await Comment.find({});
  return comments.map((u) => u.toJSON());
};

const createUsers = async (users) => {
  for (let user of users) {
    const passwordHash = await bcrypt.hash("password", 10);

    let userObject = new User({
      ...user,
      passwordHash,
    });

    await userObject.save();
  }
};

const createBlogs = async (blogs) => {
  const blogObjects = blogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
};

const getValidToken = async () => {
  const username = initialUsers[0].username;
  const response = await api
    .post("/api/login")
    .send({ username, password: "password" });
  return response.body.token;
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  initialUsers,
  createUsers,
  createBlogs,
  getValidToken,
  commentsInDb,
};

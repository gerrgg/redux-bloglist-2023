const blogRouter = require("express").Router();
const Blog = require("../models/blogs");
const Comment = require("../models/comments");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { content: 1 });
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  // update blog
  const savedBlog = await blog.save();

  // update user
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogRouter.delete("/:id", async (request, response) => {
  const user = request.user;
  const blogToDelete = await Blog.findById(request.params.id);

  // web token must match token of user
  if (user && String(user.id) === String(blogToDelete.user)) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    return response.status(401).json({ error: "token missing or invalid" });
  }
});

blogRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  });

  response.json(updatedBlog);
});

blogRouter.post("/:id/comment", async (request, response) => {
  const body = request.body;

  const blog = await Blog.findById(request.params.id);

  const comment = new Comment({
    content: body.content,
    blog: blog._id,
  });

  // update blog
  const savedComment = await comment.save();

  // update user
  blog.comments = blog.comments.concat(savedComment._id);

  await blog.save();

  response.status(201).json(savedComment);
});

module.exports = blogRouter;

const commentRouter = require("express").Router();
const Comment = require("../models/comments");
const Blog = require("../models/blogs");

commentRouter.get("/", async (request, response) => {
  const comments = await Comment.find({});
  response.json(comments);
});

commentRouter.post("/", async (request, response) => {
  const body = request.body;
  const blog = await Blog.findById(body.blog);

  const comment = new Comment({
    content: body.content,
    blog: blog._id,
  });

  // update blog
  const savedComment = await comment.save();

  // update user
  blog.comments = blog.comments.concat(savedComment._id);
  const savedBlog = await blog.save();

  response.status(201).json(savedComment);
});

module.exports = commentRouter;

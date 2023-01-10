import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { likeBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import Comments from "./Comments";

const BlogPage = () => {
  const id = useParams().id;
  const dispatch = useDispatch();

  const blog = useSelector((state) => state.blogs.find((u) => u.id === id));

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>{`${blog.title} <${blog.author}>`}</h2>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>Likes: {blog.likes}</p>
      <p>
        Added by:{" "}
        <Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link>
      </p>
      <p>
        <button onClick={() => dispatch(likeBlog(blog))}>Like</button>
      </p>
      <Comments blog={blog} />
    </div>
  );
};

export default BlogPage;

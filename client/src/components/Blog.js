import { removeBlog } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);

  const DeleteButton = () => {
    return (
      <button
        onClick={() => {
          dispatch(removeBlog(blog));
        }}
      >
        Delete
      </button>
    );
  };

  return (
    <div
      style={{
        border: "1px solid #333",
        padding: "0.25rem",
        margin: "0.25rem",
        maxWidth: "500px",
      }}
    >
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} - {blog.author}
      </Link>{" "}
      &nbsp;
      {user && blog.user.username === user.username ? <DeleteButton /> : null}
    </div>
  );
};

export default Blog;

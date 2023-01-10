import styled from "styled-components";
import useField from "../hooks/useField";
import { commentBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";

const BlogComments = ({ comments }) => {
  return (
    <ul>
      {comments ? (
        comments.map((c) => <li key={c.id}>{c.content}</li>)
      ) : (
        <p>Be the first one to comment!</p>
      )}
    </ul>
  );
};

const Comments = ({ blog }) => {
  const comment = useField("text", "comment");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(commentBlog(blog, comment.value));
    comment.onReset();
  };

  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <input id="comment" {...comment} />
        <button>Add</button>
      </form>
      <BlogComments comments={blog.comments} />
    </div>
  );
};

export default Comments;

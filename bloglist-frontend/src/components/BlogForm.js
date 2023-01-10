import { useState, useRef } from "react";
import Togglable from "./Togglable";
import { useDispatch } from "react-redux";
import { addBlog } from "../reducers/blogReducer";
import useField, { clear } from "../hooks/useField";

const BlogForm = () => {
  // const [title, setTitle] = useState("");
  const title = useField("text", "title");
  const author = useField("text", "author");
  const url = useField("text", "url");
  const formRef = useRef();
  const dispatch = useDispatch();

  const handleCreate = async (event) => {
    event.preventDefault();
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };

    dispatch(addBlog(blog));
    formRef.current.toggleVisibility();
    clearFields();
  };

  const clearFields = () => [title].forEach((i) => i.onReset());

  return (
    <Togglable buttonLabel="New Blog" ref={formRef}>
      <form
        onSubmit={handleCreate}
        style={{
          marginBottom: "1rem",
        }}
      >
        <h2>Create Post</h2>
        <div>
          <input id="title" name="title" {...title} />
        </div>
        <div>
          <input id="author" name="author" {...author} />
        </div>
        <div>
          <input id="url" name="url" {...url} />
        </div>
        <button id="add-blog" onClick={handleCreate}>
          Create
        </button>
      </form>
    </Togglable>
  );
};

export default BlogForm;

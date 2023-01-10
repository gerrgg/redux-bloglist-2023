import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import commentService from "../services/comments";
import { updateNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;

      return state.map((s) => (s.id === updatedBlog.id ? updatedBlog : s));
    },
    appendBlog(state, action) {
      return state.concat(action.payload);
    },
    deleteBlog(state, action) {
      return state.filter((s) => s.id !== action.payload);
    },
  },
});

export const { setBlogs, updateBlog, appendBlog, deleteBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    } catch (e) {
      dispatch(updateNotification(e.response.data.error));
    }
  };
};

export const likeBlog = (blog) => {
  const updatedBlog = { ...blog, likes: blog.likes + 1 };

  return async (dispatch) => {
    try {
      await blogService.update(blog.id, updatedBlog);
      dispatch(updateBlog(updatedBlog));
    } catch (e) {
      dispatch(updateNotification(e.response.data.error));
    }
  };
};

export const addBlog = (blog) => {
  return async (dispatch) => {
    try {
      const response = await blogService.create(blog);
      dispatch(appendBlog(response));
    } catch (e) {
      dispatch(updateNotification(e.response.data.error));
    }
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id);
      dispatch(deleteBlog(blog.id));
    } catch (e) {
      dispatch(updateNotification(e.response.data.error));
    }
  };
};

export const commentBlog = (blog, content) => {
  return async (dispatch) => {
    try {
      const newComment = await commentService.create(blog.id, { content });
      const updatedBlog = {
        ...blog,
        comments: blog.comments.concat(newComment),
      };

      dispatch(updateBlog(updatedBlog));
    } catch (e) {
      dispatch(updateNotification(e.response.data.error));
    }
  };
};

export default blogSlice.reducer;

import deepFreeze from "deep-freeze";
import blogReducer from "./blogReducer";

describe("blog reducer", () => {
  const initialState = [];

  test("blogs can be set", () => {
    const blogs = [
      {
        content: "blog",
        author: "author",
        url: "url",
      },
    ];

    const action = {
      type: "blogs/setBlogs",
      payload: blogs,
    };

    const state = [];

    deepFreeze(state);

    const newState = blogReducer(state, action);

    expect(newState).not.toEqual(initialState);
    expect(newState.length).toBe(1);
  });

  test("blogs can be liked", () => {
    const blog = {
      content: "blog",
      author: "author",
      url: "url",
      likes: 1,
    };

    const state = [blog];

    deepFreeze(state);

    const action = {
      type: "blogs/updateBlog",
      payload: { blog, likes: blog.likes + 1 },
    };

    const newState = blogReducer(state, action);

    expect(newState[0].likes).toBe(2);
  });

  test("a blog can be added", () => {
    const blog = {
      content: "blog",
      author: "author",
      url: "url",
      likes: 1,
    };

    const state = [];

    deepFreeze(state);

    expect(state.length).toBe(0);

    const action = {
      type: "blogs/appendBlog",
      payload: blog,
    };

    const newState = blogReducer(state, action);

    expect(newState.length).toBe(1);
  });

  test("a blog can be removed", () => {
    const blog = {
      content: "blog",
      author: "author",
      url: "url",
      likes: 1,
      id: 1,
    };

    const state = [blog];

    deepFreeze(state);

    expect(state.length).toBe(1);

    const action = {
      type: "blogs/deleteBlog",
      payload: blog.id,
    };

    const newState = blogReducer(state, action);

    expect(newState.length).toBe(0);
  });
});

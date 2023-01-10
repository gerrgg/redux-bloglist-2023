import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import { updateNotification } from "./notificationReducer";
import blogService from "../services/blogs";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    setUser(state, action) {
      blogService.setToken(action.payload.token);
      return action.payload;
    },
    logoutUser(state, action) {
      return null;
    },
  },
});

export const { setUser, logoutUser } = loginSlice.actions;

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      dispatch(updateNotification(`Hello, ${user.username}!`));
      dispatch(setUser(user));
    } catch (e) {
      dispatch(updateNotification(e.response.data.error));
    }
  };
};

export const loginUserFromLocalStorage = () => {
  return async (dispatch) => {
    const user = JSON.parse(window.localStorage.getItem("loggedInUser"));
    dispatch(setUser(user));
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.clear();
    dispatch(logoutUser());
  };
};

export default loginSlice.reducer;

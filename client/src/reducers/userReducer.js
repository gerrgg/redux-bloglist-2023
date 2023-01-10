import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";
import { updateNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll();
      dispatch(setUsers(users));
    } catch (e) {
      dispatch(updateNotification(e.response.data.error));
    }
  };
};

export default userSlice.reducer;

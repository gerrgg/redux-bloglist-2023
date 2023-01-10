import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    update(state, action) {
      return action.payload;
    },
    clear(state, action) {
      return "";
    },
  },
});

export const { update, clear } = notificationSlice.actions;

export const updateNotification = (notification) => {
  return async (dispatch) => {
    dispatch(update(notification));
  };
};

export const clearNotification = () => {
  return async (dispatch) => {
    dispatch(clear());
  };
};

export default notificationSlice.reducer;

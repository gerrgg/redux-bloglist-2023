import deepFreeze from "deep-freeze";
import notificationReducer from "./notificationReducer";

describe("notification reducer", () => {
  const initialState = "initial state";

  test("notification can be changed", () => {
    const action = {
      type: "notification/update",
      payload: "test anecdote",
    };

    const state = initialState;
    deepFreeze(state);
    const newState = notificationReducer(state, action);

    expect(newState).not.toEqual(initialState);
  });
});

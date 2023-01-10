import deepFreeze from "deep-freeze";
import userReducer from "./userReducer";

describe("user reducer", () => {
  test("users can be set", () => {
    const users = [
      {
        username: "admin",
        name: "name",
        token: "1-20381029387",
      },
    ];

    const action = {
      type: "users/setUsers",
      payload: users,
    };

    const state = [];

    deepFreeze(state);

    expect(state.length).toBe(0);

    const newState = userReducer(state, action);

    expect(newState.length).toBe(1);
  });
});

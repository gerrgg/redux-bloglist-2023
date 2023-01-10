import deepFreeze from "deep-freeze";
import loginReducer from "./loginReducer";

describe("login reducer", () => {
  const initialState = [];

  test("login can be changed", () => {
    const action = {
      type: "login/setUser",
      payload: {
        username: "greg",
        name: "greg",
        token: "12-0983-10293-0123",
      },
    };

    const state = initialState;
    deepFreeze(state);

    const newState = loginReducer(state, action);

    expect(newState).not.toEqual(initialState);
  });
});

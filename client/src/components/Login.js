import { useState } from "react";
import { loginUser } from "../reducers/loginReducer";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Modal from "./Modal";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(loginUser(username, password));
    setPassword("");
    setUsername("");
  };

  return (
    <>
      <Modal buttonLabel="Log In">
        <form
          method="POST"
          onSubmit={handleLogin}
          style={{ marginBottom: "1rem" }}
        >
          <div>
            <input
              type="text"
              value={username}
              placeholder="Username"
              name="username"
              id="username"
              onChange={({ target }) => {
                setUsername(target.value);
              }}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              id="password"
              name="password"
              onChange={({ target }) => {
                setPassword(target.value);
              }}
            />
          </div>
          <button id="login-button">Submit</button>
        </form>
      </Modal>
    </>
  );
};

export default Login;

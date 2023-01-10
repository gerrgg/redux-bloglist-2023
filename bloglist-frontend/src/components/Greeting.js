import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/loginReducer";
import { updateNotification } from "../reducers/notificationReducer";
import styled from "styled-components";

const Root = styled.div`
  display: flex;
`;

const Greeting = () => {
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(updateNotification(`Goodbye, ${user.username}!`));
  };

  return (
    <div>
      <p>Hello, {user.username}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Greeting;

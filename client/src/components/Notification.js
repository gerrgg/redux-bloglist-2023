import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  // clear notification after 2s
  useEffect(() => {
    if (notification === "") return;

    const timer = setTimeout(() => dispatch(clearNotification()), 2000);
    return () => clearTimeout(timer);
  }, [notification, dispatch]);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    display: notification === "" ? "none" : "block",
  };
  return <div style={style}>{notification}</div>;
};

export default Notification;

import { useEffect } from "react";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import { useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { loginUserFromLocalStorage } from "./reducers/loginReducer";
import Header from "./components/Header";
import styled from "styled-components";
import UsersList from "./components/UsersList";
import UserPage from "./components/UserPage";
import BlogPage from "./components/BlogPage";
import { slugify } from "./helpers";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { initializeUsers } from "./reducers/userReducer";

const Body = styled.div`
  margin-top: 120px;
`;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginUserFromLocalStorage());
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Body>
        <Notification />
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="users" element={<UsersList />} />
          <Route path="users/:id" element={<UserPage />} />
          <Route path="blogs/:id" element={<BlogPage />} />
        </Routes>
      </Body>
    </Router>
  );
};

export default App;

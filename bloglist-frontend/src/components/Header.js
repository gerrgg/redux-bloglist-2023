import styled from "styled-components";
import Greeting from "./Greeting";
import Login from "./Login";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Header = () => {
  const user = useSelector((state) => state.login);

  return (
    <Root>
      <Wrap>
        <Navigation>
          <Logo>
            <MenuLink to="/">Super Cool Blog</MenuLink>
          </Logo>
          <Menu>
            <MenuLink to="/users">Users</MenuLink>
          </Menu>
        </Navigation>
        {user === null ? <Login /> : <Greeting />}
      </Wrap>
    </Root>
  );
};

export default Header;

const Root = styled.header`
  padding: 5px 20px;
  background: #333;
  color: #f1f1f1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
`;

const Wrap = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 15px;
  align-items: baseline;
`;

const Logo = styled.h1`
  margin-right: 1rem;

  a {
    font-size: 2rem;
    letter-spacing: 0.05em;
  }
`;

const Menu = styled.ul`
  display: flex;
  gap: 15px;
  margin: 0;
`;

const MenuLink = styled(Link)`
  color: #f1f1f1;
  text-decoration: none;
  font-weight: bold;
  letter-spacing: 0.1em;
  transition: color 0.3s ease;
  &:hover {
    color: #8f8ae3;
  }
`;

import { useSelector } from "react-redux";
import styled from "styled-components";

import { Link } from "react-router-dom";

const Title = styled(Link)`
  text-decoration: none;
  transition: color 0.3s ease;
  &:hover {
    color: #333;
  }
`;

const User = ({ user }) => (
  <tr>
    <td>
      <Title to={`/users/${user.id}`}>{user.username}</Title>
    </td>
    <td>{user.blogs.length}</td>
  </tr>
);

export const Table = styled.table`
  max-width: 500px;
  width: 100%;
  border: 1px solid #333;
  border-collapse: collapse;

  th {
    text-align: center;
    background: #333;
    color: #fff;
  }

  td {
    border: 1px solid #333;
    line-height: 30px;
    font-size: 1.25rem;
    padding: 5px 10px;
  }
`;

const UsersList = () => {
  const users = useSelector((state) => state.users);
  return (
    <div>
      <h2>Users</h2>
      <Table>
        <tbody>
          <tr>
            <th>Username</th>
            <th># of Blogs</th>
          </tr>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersList;

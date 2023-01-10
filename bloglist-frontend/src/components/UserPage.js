import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { slugify } from "../helpers";
import { Table } from "./UsersList";

const Title = styled(Link)`
  text-decoration: none;
  transition: color 0.3s ease;
  &:hover {
    color: #333;
  }
`;

const Blog = ({ blog }) => {
  return (
    <tr>
      <td>
        <Title to={`/blogs/${blog.id}`}>{blog.title}</Title>
      </td>
      <td>{blog.author}</td>
    </tr>
  );
};

const UserPage = () => {
  const id = useParams().id;
  const user = useSelector((state) => state.users.find((u) => u.id === id));

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{`${user.name} <${user.username}>`}</h2>
      <h3>Added Blogs</h3>
      <Table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
          {user.blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserPage;

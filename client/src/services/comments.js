import axios from "axios";
const baseUrl = "/api/comments";

const create = async (id, newObject) => {
  const response = await axios.post(`/api/blogs/${id}/comment`, newObject);
  return response.data;
};

export default { create };

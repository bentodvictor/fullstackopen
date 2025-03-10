import axios from "axios";
const baseUrl = "/api/users";

const getUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getUser = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`);
  return response.data;
};

export default { getUsers, getUser };

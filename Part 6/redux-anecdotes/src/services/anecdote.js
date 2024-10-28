import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

const create = async (content) => {
  try {
    const response = await axios.post(baseUrl, {
      content: content,
      id: getId(),
      votes: 0,
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

const addVote = async (anecdote) => {
  try {
    const { id, content, votes } = anecdote;
    const response = await axios.patch(`${baseUrl}/${id}`, {
      id: id,
      content: content,
      votes: votes + 1,
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export default { getAll, create, addVote };

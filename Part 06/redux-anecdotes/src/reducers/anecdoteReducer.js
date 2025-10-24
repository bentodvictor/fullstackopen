import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdote";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    addVoteOf(state, action) {
      const { id } = action.payload;

      return state.map((s) => {
        return s.id == id ? { ...action.payload } : s;
      });
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { addVoteOf, createAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch(createAnecdote(newAnecdote));
  };
};

export const incrementVote = (content) => {
  return async (dispatch) => {
    const addedVote = await anecdoteService.addVote(content);
    console.log({ addedVote });
    dispatch(addVoteOf(addedVote));
  };
};

export default anecdoteSlice.reducer;

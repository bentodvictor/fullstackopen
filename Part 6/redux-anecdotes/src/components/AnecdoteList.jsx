import { useDispatch, useSelector } from "react-redux";
import { incrementVote } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer";

export const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (!filter) return [...anecdotes].sort((a, b) => b.votes - a.votes);

    return [...anecdotes]
      .filter((a) => a.content.includes(filter))
      .sort((a, b) => b.votes - a.votes);
  });

  const vote = (anecdote) => {
    dispatch(incrementVote(anecdote));
    dispatch(notify(`you voted '${anecdote.content}'`, 3000));
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  ));
};

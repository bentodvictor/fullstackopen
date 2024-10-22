import { useDispatch, useSelector } from "react-redux";
import { addVoteOf } from "../reducers/anecdoteReducer";

export const AnecdoteList = () => {
    const anecdotes = useSelector(state => state);

    const dispatch = useDispatch();

    const anecdotesOrdered = anecdotes.sort((a, b) => b.votes - a.votes);

    const vote = (id) => dispatch(addVoteOf(id));

    return (
        anecdotesOrdered.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
            </div>
        )
    )
}
import { useDispatch, useSelector } from "react-redux";
import { addVoteOf } from "../reducers/anecdoteReducer";
import { notifyVote } from "../reducers/notificationReducer";

export const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (!filter)
            return [...anecdotes].sort((a, b) => b.votes - a.votes);

        return [...anecdotes]
            .filter(a => a.content.includes(filter))
            .sort((a, b) => b.votes - a.votes);
    });

    const dispatch = useDispatch();

    const vote = ({ id, content }) => {
        dispatch(addVoteOf(id))
        dispatch(notifyVote(content))
    };

    return (
        anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
        )
    )
}
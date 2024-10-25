import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { notifyCreation } from "../reducers/notificationReducer";

export const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const submitHandler = (event) => {
        event.preventDefault();

        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';

        dispatch(createAnecdote(content));
        dispatch(notifyCreation(content));
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={submitHandler}>
                <div><input name='anecdote' /></div>
                <button>create</button>
            </form>
        </>
    )
}
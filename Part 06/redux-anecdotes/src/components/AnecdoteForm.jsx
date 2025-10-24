import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { notify, notifyCreation } from "../reducers/notificationReducer";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const submitHandler = async (event) => {
    try {
      event.preventDefault();

      const content = event.target.anecdote.value;
      event.target.anecdote.value = "";

      dispatch(addAnecdote(content));
      dispatch(notify(`anecdote '${content}' created`, 3000));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={submitHandler}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export const Anecdote = ({ title, body, vote }) => (
    <>
        <h1>{title}</h1>
        <p>{body}</p>
        <p>has {vote} votes</p>
    </>
)
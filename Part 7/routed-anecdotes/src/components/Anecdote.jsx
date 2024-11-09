export const Anecdote = ({ anecdote }) => {
    const { content, author, info, votes, id } = anecdote
    
    return (
        <div key={id}>
            <h2>{content} by {author}</h2>
            <p>has {votes} votes</p>
            <p>for more infor see <a href={info}>{info}</a></p>
        </div>
    )
}
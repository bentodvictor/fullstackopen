export const BlogForm = ({ addBlog, title, author, url, onChangeTitle, onChangeAuthor, onChangeUrl }) => {

    return (
        <div>
            <form onSubmit={addBlog}>
                <label htmlFor='title'>title:</label>
                <input type='text' value={title} name='title' id='title' onChange={onChangeTitle} />
                <br />
                <label htmlFor='author'>author:</label>
                <input type='text' value={author} name='author' id='author' onChange={onChangeAuthor} />
                <br />
                <label htmlFor='url'>url:</label>
                <input type='text' value={url} name='url' id='url' onChange={onChangeUrl} />
                <br />
                <button type='submit'>save</button>
            </form>
        </div>)
}
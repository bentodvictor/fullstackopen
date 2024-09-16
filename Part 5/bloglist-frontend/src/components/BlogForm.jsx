import { useState } from 'react'

export const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  return (
    <div>
      <form onSubmit={addBlog}>
        <label htmlFor='title'>title:</label>
        <input type='text' value={title} name='title' id='title' onChange={({ target }) => setTitle(target.value)} />
        <br />
        <label htmlFor='author'>author:</label>
        <input type='text' value={author} name='author' id='author' onChange={({ target }) => setAuthor(target.value)} />
        <br />
        <label htmlFor='url'>url:</label>
        <input type='text' value={url} name='url' id='url' onChange={({ target }) => setUrl(target.value)} />
        <br />
        <button type='submit'>save</button>
      </form>
    </div>)
}
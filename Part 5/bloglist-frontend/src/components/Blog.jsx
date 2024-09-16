import { useState } from 'react'

const Blog = ({ blog, handleLike, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClickDetails = () => setShowDetails(!showDetails)

  const handleDelete = () => {
    const confirmation = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

    if (confirmation) {
      deleteBlog(blog.id)
    }
  }

  const label = showDetails ? 'hide' : 'show'

  const blogView =
    <div>
      <p>
        {blog.title} {blog.author}
        <button onClick={handleClickDetails}>{label}</button>
      </p>
    </div>

  const blogDetailsView =
    <div>
      <p>{blog.title} <button onClick={handleClickDetails}>{label}</button></p>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button onClick={() => handleLike(blog)}>add like</button></p>
      <p>{blog.author}</p>
      <button onClick={handleDelete}>remove</button>
    </div>

  return (
    <div style={blogStyle}>
      {!showDetails && blogView}
      {showDetails && blogDetailsView}
    </div>
  )
}

export default Blog
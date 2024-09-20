import Blog from './Blog'

export const BlogList = ({ blogs, username, handleLike, deleteBlog }) => (
  <div>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} username={username} handleLike={handleLike} deleteBlog={deleteBlog} />
    )}
  </div>
)
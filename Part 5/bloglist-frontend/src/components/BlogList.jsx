import Blog from './Blog'

export const BlogList = ({ blogs, handleLike, deleteBlog }) => (
  <div>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} handleLike={handleLike} deleteBlog={deleteBlog} />
    )}
  </div>
)
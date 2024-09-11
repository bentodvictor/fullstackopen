import Blog from "./Blog";

export const BlogList = ({blogs}) => (
    <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
)
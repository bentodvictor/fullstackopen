import { useSelector } from "react-redux";
import Blog from "./Blog";

export const BlogList = () => {
  const blogs = useSelector((state) => state.blog);

  return (
    <div>
      {blogs.map((blog) => {
        return <Blog key={blog.id} blog={blog} />;
      })}
    </div>
  );
};

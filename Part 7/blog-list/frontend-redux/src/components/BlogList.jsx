import { useSelector } from "react-redux";
import Blog from "./Blog";
import { Link, useNavigate } from "react-router-dom";
import { BlogListStyle } from "../styles";

export const BlogList = () => {
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blog);

  return (
    <BlogListStyle>
      <div>
        <ul>
          {blogs.map((blog) => {
            return (
              <li key={blog.id}>
                <Link key={blog.id} to={"/blogs/" + blog.id}>
                  {blog.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </BlogListStyle>
  );
};

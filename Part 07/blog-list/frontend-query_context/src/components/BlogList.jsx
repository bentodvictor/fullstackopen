import { useQuery } from "@tanstack/react-query";
import Blog from "./Blog";
import blogService from "../services/blogs";
import { BlogListStyle } from "../styles";
import { Link, useNavigate } from "react-router-dom";
import { useUserValue } from "../UserContext";

export const BlogList = () => {
  const blogs = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  })?.data?.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <BlogListStyle>
        <ul>
          {blogs?.map((blog) => {
            return (
              <li key={blog?.id}>
                <Link key={blog?.id} to={"/blogs/" + blog?.id}>
                  {blog?.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </BlogListStyle>
    </div>
  );
};

import { useQuery } from "@tanstack/react-query";
import Blog from "./Blog";
import blogService from "../services/blogs";

export const BlogList = () => {
  const blogs = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  })?.data?.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {blogs?.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

import { useRef } from "react";
import { BlogForm } from "./BlogForm";
import { BlogList } from "./BlogList";
import { Togglable } from "./Togglable";

export const Home = () => {
  const blogFormRef = useRef();

  return (
    <>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <BlogList />
    </>
  );
};

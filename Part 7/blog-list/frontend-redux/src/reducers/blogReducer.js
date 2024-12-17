import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs.js";
import { notify } from "./notificationReducer.js";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBlog: (state, action) => {
      return action.payload;
    },
    addBlog: (state, action) => {
      state.push(action.payload);
    },
    addLikeOf: (state, action) => {
      const { id } = action.payload;
      const blogs = state.map((s) => {
        return s.id === id ? { ...action.payload } : s;
      });
      return blogs.sort((a, b) => b.likes - a.likes);
    },
    removeBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload);
    },
    toggle: (state, action) => {
      const blogId = action.payload; // Extract the `blogId`
      const blog = state.find((b) => b.id === blogId); // Find the blog by ID

      if (blog) {
        blog.visible = !blog.visible;
      }
    },
    setComment: (state, action) => {
      const { newComment, blogId } = action.payload;

      state.map((blog) => {
        if (blog.id === blogId) {
          blog.comments.push(newComment);
        }
      });
    },
  },
});

export const { setBlog, addBlog, addLikeOf, removeBlog, toggle, setComment } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    let blogs = await blogService.getAll();
    blogs.sort((a, b) => b.likes - a.likes);
    // add visible to all blogs
    blogs = blogs.map((b) => {
      return {
        ...b,
        visible: false,
      };
    });
    dispatch(setBlog(blogs));
  };
};

export const addNewBlog = (content) => {
  return async (dispatch) => {
    let newBlog = await blogService.create(content);
    newBlog["visible"] = false;
    dispatch(addBlog(newBlog));
    dispatch(
      notify({
        type: "success",
        message: `a new blog "${newBlog?.title}" by "${newBlog?.author}" added`,
      }),
    );
  };
};

export const incrementVote = (id, content) => {
  return async (dispatch) => {
    let addedLike = await blogService.update(id, content);
    addedLike["visible"] = true;
    dispatch(addLikeOf(addedLike));
  };
};

export const deleteBlogs = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(removeBlog(id));
  };
};

export const toggleView = (blogId) => {
  return async (dispatch) => {
    dispatch(toggle(blogId));
  };
};

export const addComment = (blogId, comment) => {
  return async (dispatch) => {
    const newComment = await blogService.addComment(blogId, comment);
    dispatch(setComment({ newComment, blogId }));
  };
};

export default blogSlice.reducer;

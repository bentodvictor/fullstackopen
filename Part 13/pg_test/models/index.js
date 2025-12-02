import Blog from "./Blog.js";
import Note from "./Note.js";

Note.sync();
Blog.sync();

module.exports = {
  Note,
  Blog,
};

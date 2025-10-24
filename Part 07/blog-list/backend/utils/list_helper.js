const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, current) => acc + current.likes, 0);
};

const favoriteBlog = (blogs) => {
  const mostLiked = blogs.reduce((mostLiked, blog) => {
    return mostLiked.likes > blog.likes ? mostLiked : blog;
  });

  let mostLikedCopy = mostLiked;
  delete mostLikedCopy._id;
  delete mostLikedCopy.__v;
  delete mostLikedCopy.url;

  return mostLikedCopy;
};

const mostBlogs = (blogs) => {
  const authorBlogs = _.groupBy(blogs, "author");
  const authorMostBlogs = _.reduce(
    authorBlogs,
    (result, value, key) => {
      return result?.blogs > value.length
        ? result
        : {
            author: key,
            blogs: value.length,
          };
    },
    {},
  );

  return authorMostBlogs;
};

const mostLikes = (blogs) => {
  const authorLikes = _.groupBy(blogs, "author");
  const authorMostLikes = _.reduce(
    authorLikes,
    (result, value, key) => {
      const currentTotalLikes = value.reduce(
        (acc, current) => acc + current.likes,
        0,
      );
      return result?.likes > currentTotalLikes
        ? result
        : {
            author: key,
            likes: currentTotalLikes,
          };
    },
    {},
  );

  return authorMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

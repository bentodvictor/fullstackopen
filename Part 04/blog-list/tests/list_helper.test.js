const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper.js')

const blogs = [
    {
        _id: "66c69d75f9f5c5a232cf2e36",
        title: "New Blog Post",
        author: "John Doe",
        url: "http://example.com/new-post",
        likes: 42,
        __v: 0
    },
    {
        _id: "66c69d75f9f5c5a232cf5435",
        title: "New Blog Post 2",
        author: "John Doe",
        url: "http://example.com/new-post",
        likes: 10,
        __v: 0
    },
    {
        _id: "76c70e75f9f5c5a232cf2e48",
        title: "Another Blog Post",
        author: "Jane Smith",
        url: "http://example.com/another-post",
        likes: 15,
        __v: 0
    },
    {
        _id: "86c71e85f9f5c5a232cf2e59",
        title: "Yet Another Blog",
        author: "Alice Johnson",
        url: "http://example.com/yet-another-post",
        likes: 25,
        __v: 0
    }
]

test('dummy return one', () => {
    const result = listHelper.dummy(blogs)

    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes([blogs[0]])
      assert.strictEqual(result, 42)
    })
  })

describe('favorite blog', () => {
    test('should return 42 likes', () => {
        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, { title: "New Blog Post", author: "John Doe", likes: 42, })
    })
})

describe('most blogs', () => {
    test('author who has the largest amount of blogs', () => {
        const result = listHelper.mostBlogs(blogs);
        assert.deepStrictEqual(result, { author: 'John Doe', blogs: 2 })
    })
})

describe('most likes', () => {
    test('author who has most likes', () => {
        const result = listHelper.mostLikes(blogs);
        assert.deepStrictEqual(result, { author: 'John Doe', likes: 52 })
    })
})
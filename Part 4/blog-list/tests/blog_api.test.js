const { beforeEach, describe, test, after } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../tests/test_helper.test')
const Blog = require('../models/blog')

const api = supertest(app)

describe.only('blogs tests', () => {
    beforeEach(async () => {
        await Blog.deleteMany({});  // Clear the database before each test
        await Blog.insertMany(helper.initialBlogs)
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.title)
        assert(contents.includes('Blog post 2'))
    })


    test('blogs post has an Id property', async () => {
        const response = await api.get('/api/blogs')
        const blogs = response.body

        blogs.forEach(blog => {
            assert(blog.id !== undefined, 'id should be defined')
            assert.strictEqual(blog._id, undefined, '_id should be undefined')
        })
    })

    test('a valid blog can be add', async () => {
        const newBlog = {
            title: 'Valid blog post',
            author: 'Valid author',
            url: 'www.validUrl.com',
            likes: 1
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsAfterPost = await Blog.find({});  // Get blogs after the POST request
        assert.strictEqual(blogsAfterPost.length, helper.initialBlogs.length + 1);  // Verify the count is increased by 1

        const titles = blogsAfterPost.map(blog => blog.title);
        assert(titles.includes('Blog post 1'));  // Check if the new blog is in the database
    })

    test('if like property is missing, it defaults to 0', async () => {
        const newBlogWithoutLike = {
            title: 'Valid blog post',
            author: 'Valid author',
            url: 'www.validUrl.com'
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlogWithoutLike)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const savedBlog = response.body
        assert.strictEqual(savedBlog.likes, 0, 'likes should default to 0')
    })

    test('if title or url property is missing, the response should be 400 (bad request)', async () => {
        const newBlogWithoutTitle = {
            author: 'Valid author',
            url: 'www.validUrl.com',
            likes: 1
        }

        const newBlogWithoutUrl = {
            title: 'New blog test',
            author: 'Valid author',
            likes: 1
        }

        // Test post without title
        await api
            .post('/api/blogs')
            .send(newBlogWithoutTitle)
            .expect(400)

        // Test post without utl
        await api
            .post('/api/blogs')
            .send(newBlogWithoutUrl)
            .expect(400)
    })

    describe('delete a single blog', () => {
        test('total blogs count should be reduced by one', async () => {
            const blogsAtStart = await Blog.find({})
            const blogToDelete = await blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()

            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

            const contents = blogsAtEnd.map(b => b.title)
            assert(!contents.includes(blogToDelete.title))
        })
    })

    describe('updating a blog', () => {
        test('update the total of likes from a blog', async () => {
            const blogs = await helper.blogsInDb()
            const [firstBlog] = blogs
            const likesBeforeUpdate = firstBlog.likes
            console.log({ blogs })

            firstBlog.likes = 0

            const updatedBlog = await api
                .put(`/api/blogs/${firstBlog.id}`)
                .expect('Content-Type', /application\/json/)
            console.log({ likesBeforeUpdate })
            console.log({ actualLikes: updatedBlog.likes })
            assert.notStrictEqual(likesBeforeUpdate, updatedBlog.likes, 'the number of likes should be different after update')
        })
    })

    after(async () => {
        await mongoose.connection.close()
    })

})
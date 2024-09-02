const { beforeEach, describe, test, after } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('Unit tests', () => {
    let headers

    beforeEach(async () => {
        // Clear the database before each test
        await Blog.deleteMany({});
        await User.deleteMany({});
        await Blog.insertMany(helper.initialBlogs)

        const newUser = {
            username: 'userHelper',
            name: 'User Helper',
            password: '@user-helper123',
        };

        // Create a new user
        await api.post('/api/users').send(newUser);

        // Log in with the newly created user
        const loginResponse = await api
            .post('/api/login')
            .send({
                username: newUser.username,  // Use the username and password directly
                password: newUser.password,
            });

        headers = {
            'Authorization': `Bearer ${loginResponse.body.token}`,  // Bearer token expected
        };
    })

    describe('Users cases', () => {
        test('creation succeeds with a fresh username', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'mluukkai',
                name: 'Matti Luukkainen',
                password: 'salainen'
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const usersAtEnd = await helper.usersInDb()
            assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

            const usernames = usersAtEnd.map(u => u.username)
            assert(usernames.includes(newUser.username))
        })

        test('creation fails with proper statuscode and message if username already taken', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'userHelper',
                name: 'Superuser',
                password: 'salainen',
            }

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            const usersAtEnd = await helper.usersInDb()
            assert(result.body.error.includes('expected `username` to be unique'));
            assert.strictEqual(usersAtEnd.length, usersAtStart.length);
        })

        test('creation fails when the usarname is too short', async () => {
            const newUser = {
                username: 'x',
                name: 'Test New User',
                password: '@X123'
            }
            const errorMessage = `User validation failed: username: Path \`username\` (\`${newUser.username}\`) is shorter than the minimum allowed length (3).`

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            assert.strictEqual(result.body.error, errorMessage)
        })
    })

    describe('Blogs cases', () => {
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
                .set(headers)
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
                .set(headers)
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
                .set(headers)
                .send(newBlogWithoutTitle)
                .expect(400)

            // Test post without utl
            await api
                .post('/api/blogs')
                .set(headers)
                .send(newBlogWithoutUrl)
                .expect(400)
        })

        test('total blogs count should be reduced by one', async () => {
            const blogToDelete = {
                title: 'Blog to delete',
                author: 'Just me',
                url: 'www.validUrl.com',
                likes: 1
            }

            const savedBlog = await api
                .post('/api/blogs')
                .set(headers)
                .send(blogToDelete)

            const blogsBeforeDelete = await helper.blogsInDb()

            await api
                .delete(`/api/blogs/${savedBlog.body.id}`)
                .set(headers)
                .expect(204)


            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, blogsBeforeDelete.length - 1)

            const contents = blogsAtEnd.map(b => b.title)
            assert(!contents.includes(blogToDelete.title))
        })

        test('update the total of likes from a blog', async () => {
            const blogs = await helper.blogsInDb()
            const [firstBlog] = blogs
            const likesBeforeUpdate = firstBlog.likes

            firstBlog.likes = 0

            const updatedBlog = await api
                .put(`/api/blogs/${firstBlog.id}`)
                .expect('Content-Type', /application\/json/)
                
            assert.notStrictEqual(likesBeforeUpdate, updatedBlog.likes, 'the number of likes should be different after update')
        })
    })

    after(async () => {
        await mongoose.connection.close()
    })
})
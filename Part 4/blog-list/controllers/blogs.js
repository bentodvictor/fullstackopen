const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (blog) {
        response.json(blog)
    }
    else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response) => {
    const { title, author, url, likes } = request.body

    if (!title || !url) {
        return response.status(400).end()
    }

    const blog = new Blog({
        title,
        author,
        url,
        likes: likes ?? 0
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body
    const blog = { title, author, url, likes }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const { id } = request.params
    const blog = await Blog.findById(id)

    if (!blog) {
        return response.status(404).end()
    }

    await Blog.findByIdAndDelete(id)
    response.status(204).end()
})

module.exports = blogsRouter
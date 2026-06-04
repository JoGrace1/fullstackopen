const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/api/blogs', (request, response) => {
    Blog.find({}).then(post =>
        response.json(post)
    )
})

module.exports = blogsRouter

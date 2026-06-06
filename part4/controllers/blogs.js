const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const post = await Blog.find({})
    response.json(post)
    
})
blogsRouter.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body)
    if (blog.likes === undefined) blog.likes = 0 
    if (blog.title === undefined || blog.url === undefined) {
      response.status(400).end()
    } 
    const result = await blog.save()
    response.status(201).json(result)
  } catch (error) {
    console.log('🔥 POST ERROR:', error.message)
    response.status(500).json({ error: error.message })
  }
})
module.exports = blogsRouter

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
    response.status(500).json({ error: error.message })
  }
})
blogsRouter.delete('/:id', async(request, response) =>{
  try {
    const blogId = await Blog.findByIdAndDelete(request.params.id)
    if (blogId) response.status(204).end()
    else response.status(404).end()
  } catch (error){
    response.status(500).json({error: error.message})
  }
})
blogsRouter.put('/:id', async (request, response) =>{
    try {
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    blog.url = request.body.url
    blog.title = request.body.title
    blog.author = request.body.author

    const updatedBlog = await blog.save()

    response.status(200).json(updatedBlog)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})
module.exports = blogsRouter

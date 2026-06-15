const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const post = await Blog.find({}).populate('user')
  response.json(post)
})
blogsRouter.post('/', async (request, response) => {
  try {
    if (!request.token) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = new Blog({
      ...request.body,
      user: user._id
    })

    if (blog.likes === undefined) blog.likes = 0
    if (blog.title === undefined || blog.url === undefined) {
      return response.status(400).end()
    }

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

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

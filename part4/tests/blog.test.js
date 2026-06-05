const {test, describe, after, before, beforeEach} = require('node:test')
const listHelper = require('../utils/list_helper')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app.js')
const Blog = require('../models/blog')
const config = require('../utils/config')
const api = supertest(app)

const mongoose = require('mongoose')

before(async () => {
  await mongoose.connect(config.MONGODB_URI, { family: 4 })
})

after(async () => {
  await mongoose.connection.close()
})

describe("api test", () => {
    const initialBlog = [
        {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
        },{
        _id: '5a422aa71b54a276234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Elvina Musk',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 7,
        __v: 0
        },{
        _id: '5a422aa71b54a616234d17f8',
        title: 'Freedom Figther',
        author: 'Steffi ',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 10,
        __v: 0
        }
    ]
    beforeEach(async () => {
      await Blog.deleteMany({})
      let noteObject = new Blog(initialBlog[0])
      await noteObject.save()
      noteObject = new Blog(initialBlog[1])
      await noteObject.save()
      noteObject = new Blog(initialBlog[2])
      await noteObject.save()
    })
    test("test the api get functionality",async () =>{
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('all blog posts are returned', async() =>{
      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, initialBlog.length)
    })
    test("if _id changed to id",async ()=>{
      const response = await api.get('/api/blogs')
      const blogs = response.body
      blogs.forEach(blog =>{
        assert.ok(blog.id)
        assert.strictEqual(blog._id, undefined)
      })
    })
})
describe("add new Blog post", () => {
    const newPost= {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5
    }

    test("is the new blog post added  ", async () => {
        const result = await api
        .post('/api/blogs')
        .send(newPost)
        .expect(201)
        console.log(result.body)
        assert.strictEqual(result.body.title, newPost.title)
    })
})

describe("blog return", () => {
    test("test the result ",() => {
        const blogs = []
        const result = listHelper.dummy(blogs)
        assert.strictEqual(result, 1)
    })
})
describe("total likes", () => {
    const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]
    test("when list has only one blog, equals the likes of that ", () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })
})

describe("favouritBlog ", ()=>{
    const listBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },{
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Elvina Musk',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 7,
      __v: 0
    },{
      _id: '5a422aa71b54a676234d17f8',
      title: 'Freedom Figther',
      author: 'Steffi ',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 10,
      __v: 0
    }
  ]
    test('favourit ', ()=>{
        const fav = listHelper.favouritBlog(listBlog)
        assert.strictEqual(fav, 10)
    })
})

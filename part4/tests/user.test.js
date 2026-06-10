const bcrypt = require('bcrypt')
const User = require('../models/user')
const {test, describe, after, before, beforeEach} = require('node:test')
const listHelper = require('../utils/list_helper')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app.js')
const api = supertest(app)
const usersInDb = require('./test_helper.js')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
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
})
describe('test user data', () => {
    test('creation fails if username is too short', async () => {
    const user = {
        username: 'ab',
        name: 'Test User',
        password: 'secret'
    }

    await api
        .post('/api/users')
        .send(user)
        .expect(400)
    })
    test('creation fails if password is too short', async () => {
    const user = {
        username: 'testuser',
        name: 'Test User',
        password: 'ab'
    }

    await api
        .post('/api/users')
        .send(user)
        .expect(400)
    })
    test('creation fails if username already exists', async () => {
    const user = {
        username: 'root',
        name: 'Duplicate',
        password: 'secret'
    }

    await api
        .post('/api/users')
        .send(user)
        .expect(400)
    })
})
const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')

require('dotenv').config()

const api = supertest(app)


beforeAll(() => {
  const MONGODB_URI = process.env.MONGODB_TEST_URI
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
})

describe('Testing the API', () => {
  test('GET Request to /', async () => {
    const response = await api.get('/api')
    expect(response.status).toBe(200)
    expect(response.body).toBe('The aura is tranquil')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
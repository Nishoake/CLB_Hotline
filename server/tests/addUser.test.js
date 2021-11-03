const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Subscriber = require('../models/subscriber')

require('dotenv').config()

// Wrap app with supertest to create an HTTP object
const api = supertest(app)

// User test cases
const validUser = {
  name: 'Champagne Papi',
  number: process.env.TEST_NUMBER
}
const invalidUser = {
  name: 'Pusha T',
  number: '+10000000000'
}


// Preparing DB for following tests
beforeAll(async () => {
  await Subscriber.deleteMany({})
})

// Test suite to test functionality of adding users
describe('Testing the 3 possible scenarios for adding the users', () => {
  test('Confirm that zero users in DB at start', async () => {
    const numberOfSubs = await Subscriber.countDocuments({})
    expect(numberOfSubs).toBe(0)
  })

  test('Invalid User', async () => {
    await api
      .post('/api')
      .send(invalidUser)
      .expect(200)
      .expect("Invalid number")
  })

  test('Valid User', async () => {
    await api
      .post('/api')
      .send(validUser)
      .expect(201)

    // Test that user has been added to the DB
    const numberOfSubs = await Subscriber.countDocuments({})
    expect(numberOfSubs).toBe(1)
  })

  test('Duplicate User', async () => {
    await api
      .post('/api')
      .send(validUser)
      .expect(200)
      .expect("Non-unique number")
    
    // Test that user has not been added to the DB
    const numberOfSubs = await Subscriber.countDocuments({})
    expect(numberOfSubs).toBe(1)
  })
})

// Closing connection to the Mongo Database to prevent memory leaks
afterAll(async () => {
  await mongoose.connection.close()
})
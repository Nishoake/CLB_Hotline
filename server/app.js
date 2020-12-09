const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


require('dotenv').config()

app = express()

// Middleware
app.use(bodyParser.json())

// Database dependencies
const Subscriber = require('./models/subscriber')

// Connecting to the database
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Intialize port
const port = process.env.PORT || 3005
app.listen(port, () => {
  console.log(`Certified Lover Boy Hotline app is currently listening at ${port}`)
})

// -------------------------------
// Routes
app.get('/', async (request, response) => {
  console.log(`The client is requesting an update on the album drop`)

  response.json('CLB is not dropping when the ball drops')
})

app.post('/', async (request, response) => {
  const body = await request.body

  const user = new Subscriber({
    name: body.name,
    number: body.number
  })
  console.log(user)

  let newUser = await user.save()

  response.send(newUser)
})
const express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config()

app = express()

// Middleware
app.use(bodyParser.json())

// Intialize port
const port = process.env.PORT || 3005
app.listen(port, () => {
  console.log(`HotLine Bling app listening at ${port}`)
})

// -------------------------------
// Routes
app.get('/', (request, response) => {
  console.log(`The client is requesting an update on the album drop`)
  response.json('CLB is not dropping when the ball drops')
})
// Dependencies
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Twilio = require('twilio')
const MessagingResponse = require('twilio').twiml.MessagingResponse

// Import modules using CommonJS Module syntax
const detectModule = require('./services/detection')
const utility = require('./services/utility')
const data = require('./data/data')

require('dotenv').config()

// Initialzing the Express App
const app = express()

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('build'))

// Database model dependency
const Subscriber = require('./models/subscriber')

// Checking Node Environment variable to connect to the correct database
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.MONGODB_TEST_URI
  : process.env.MONGODB_URI

// Defining Detection Constants
const artistID = process.env.ARTIST_ID

// Connecting to the database
if (process.env.NODE_ENV !== 'test') {
  detectModule.detect(artistID)
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
}

// Twilio Constants
const Twilio_SID = process.env.TWILIO_ACCOUNT_SID
const Twilio_Token = process.env.TWILIO_AUTH_TOKEN
const Twilio_Number = process.env.TWILIO_NUMBER

// Instantiating Twilio API Object
const TwilioApi = Twilio(Twilio_SID, Twilio_Token)

// -------------------------------
// Routes
app.get('/api', async (request, response) => {
  response.json('The aura is tranquil')
})

app.post('/api', async (request, response) => {
  const body = await request.body

  // Validate the number from the request
  const number = await utility.lookup(TwilioApi, body.number)
  // If not valid provide following error message
  if (!number){
    return response.send("Invalid number")
  }

  // Query database for number
  const query = await Subscriber.findOne({ number: number })
  // If not unique provide following error message
  if (query) {
    return response.send("Non-unique number")
  }

  // Adding user to database
  const user = new Subscriber({
    name: body.name,
    number: number
  })

  // Saving user
  const newUser = await user.save()
  const confirmation = {
    name: newUser.name,
    number: newUser.number,
    secret: Twilio_Number
  }

  // Send confirmation text
  utility.sendConfirmation(TwilioApi, Twilio_Number, number, body.name)


  response.send(confirmation)
})


// Following POST route serves as a webhook for handling incoming messages to the Twilio phone number
// Through the Twilio dashboard, set the webhook address to the following POST route

app.post('/bling', async (request, response) => {
  // Intializing Twilio Messaging Response Object
  const twiml = new MessagingResponse()

  // save the From # and text body into constants, 'sender' and 'text' respectively
  const sender = request.body.From
  const text = request.body.Body

  try {
    // Querying database for a matching number
    const user = await Subscriber.findOne({ number: sender })

    if (user) {  // Handling a text message from an existing user
      
      // if statement to check for Opt-out text use case
      // Added second condition to cover fringe case of an extra space if user uses autocorrect while typing 'TAKECARE'
      if ('TAKECARE'.localeCompare(text, undefined, { sensitivity: 'accent' }) === 0 || 'TAKECARE '.localeCompare(text, undefined, { sensitivity: 'accent' }) === 0) {
        await Subscriber.findByIdAndDelete(user._id)

        // Send confirmation text that user has successfully unsubscribed
        twiml.message(`${user.name} you have successfully been unsubscribed from the C.L.B. Hotline. You will not receive any more messages from this number.`)

      } else {  // Easter Egg Feature: Send randomized Drake Lyric
        
        // Generate a randomn Drake lyric from imported array
        const randomNumber = utility.randomize(data.lyrics.length - 1)

        // Send Drake lyric text
        twiml.message(`${data.lyrics[randomNumber]}`)
      }
      
    } else {  // Handling a text message from a non-existing user
      twiml.message(`Signup for the C.L.B. Hotline at: https://clb-hotline.herokuapp.com/`)
    }

    response.writeHead(200, { 'Content-Type': 'text/xml' })
    response.end(twiml.toString())

  } catch (error) {
    console.error(`Error => ${error}`)
  }
})

module.exports = app
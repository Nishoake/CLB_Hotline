const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Twilio = require('twilio')
const MessagingResponse = require('twilio').twiml.MessagingResponse
const detectModule = require('./controllers/detection')
const detect = detectModule.detect

require('dotenv').config()

app = express()

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('build'))

// Database dependencies
const Subscriber = require('./models/subscriber')

// Connecting to the database
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Twilio Constants
const Twilio_SID = process.env.TWILIO_ACCOUNT_SID
const Twilio_Token = process.env.TWILIO_AUTH_TOKEN
const Twilio_Number = process.env.TWILIO_NUMBER

// Instantiating Twilio API Object
const TwilioApi = Twilio(Twilio_SID, Twilio_Token)

// Twilio Lookup
async function lookup(number){
  try{
    // Validate number using Twilio Lookup
    let result = await TwilioApi.lookups.phoneNumbers(number).fetch()

    // Returning the number in format expected by database
    console.log(`lookup: ${result.phoneNumber}`)
    return result.phoneNumber
  } catch(error){
      console.error(`Not a valid North American number => ${error}`)
      return null
  }
}

// Twilio Confirmation Text
async function sendConfirmation(Twilio_Number, Recipient_Number, Recipient_Name) {
  try {
    console.log('The C.L.B. Hotline is currently sending a text message')

    let response = await TwilioApi.messages.create({
      body: `Hey ${Recipient_Name}! Thank you for subscribing to the C.L.B. Hotline 🔥`,
      from: Twilio_Number,
      to: Recipient_Number
    })

    console.log(response.sid)

  } catch (error) {
    console.error(`Not a valid mobile number => ${error}`)
  }
}

// Randomize Function
async function randomize(max){
  max = Math.floor(max)
  return Math.floor(Math.random() * max)
}

// Intialize port
const port = process.env.PORT || 3005
app.listen(port, () => {
  console.log(`Certified Lover Boy Hotline app is currently listening at ${port}`)
})

// Detection Constants
const artistID = process.env.ARTIST_ID
let clientResponse = {
  name: '',
  image: '',
  link: '',
  boolean: false
}

// Running the Detection Algorithm
detect(artistID, clientResponse)


// -------------------------------
// Routes
app.get('/api', async (request, response) => {
  console.log(`The client is requesting an update on the album drop`)

  response.json('CLB is not dropping when the ball drops')
})

app.post('/api', async (request, response) => {
  const body = await request.body

  // Validate the number from the request
  let number = await lookup(body.number)
  // If not valid provide following error message
  if (!number){
    return response.send("Invalid number")
  }

  // Query database for number
  let query = await Subscriber.findOne({ number: number })
  // If not unique provide following error message
  if (query) {
    return response.send("Non-unique number")
  }

  // Adding user to database
  const user = new Subscriber({
    name: body.name,
    number: number
  })
  console.log(user)
  // Saving user
  let newUser = await user.save()
  let confirmation = {
    name: newUser.name,
    number: newUser.number,
    secret: Twilio_Number
  }

  // Send confirmation text
  sendConfirmation(Twilio_Number, number, body.name)
  console.log('Text has been sent')


  response.send(confirmation)
})

// Opt-out via text functionality
app.post('/bling', async (request, response) => {
  // Intializing Twilio Messaging Response
  const twiml = new MessagingResponse()

  // Array of lyric responses
  const bars = [
    "I'm outside in an AMG 🚘",
    "You like to slide on a late night 🛷`",
    "Last name Ever, First name Greatest ⭐️",
    "I know when that Hotline Bling ... That can only mean one thing!",
    "Line Blowing Up 💣",
    "I could dance like Michael Jack-Son 🕺🏽"
  ]
  // save the From # and text body into constants, 'sender' and 'text' respectively
  const sender = request.body.From
  const text = request.body.Body

  try {
    // Querying database for a matching number
    let user = await Subscriber.findOne({ number: sender })

    // Handling the text message from the request object
    if (user) {
      // Added second condition to cover fringe case of user using the autocomplete feature
      // Which would result in an additional space
      if ('TAKECARE'.localeCompare(text, undefined, { sensitivity: 'accent' }) === 0 || 'TAKECARE '.localeCompare(text, undefined, { sensitivity: 'accent' }) === 0) {
        await Subscriber.findByIdAndDelete(user._id)

        twiml.message(`${user.name} you have successfully been unsubscribed from the C.L.B. Hotline. You will not receive any more messages from this number.`)
      } else {
        let randomNumber = randomize(bars.length - 1)

        twiml.message(`${bars[randomNumber]}`)
      }
    } else {
      twiml.message(`Signup for the C.L.B. Hotline at: https://clb-hotline.herokuapp.com/`)
    }

    response.writeHead(200, { 'Content-Type': 'text/xml' })
    response.end(twiml.toString())

  } catch (error) {
    console.error(`Error => ${error}`)
  }
  
})
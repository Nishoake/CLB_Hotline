const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Twilio = require('twilio')
const detectModule = require('./controllers/detection')
const detect = detectModule.detect
require('dotenv').config()

require('dotenv').config()

app = express()

// Middleware
app.use(bodyParser.json())

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
    let result = await TwilioApi.lookups.phoneNumbers(number).fetch({ countryCode: 'CA' })

    // Returning the number in format expected by database
    return result.phoneNumber
  } catch(error){
      console.error(error)
      return null
  }
}

// Twilio Confirmation Text
async function sendConfirmation(Twilio_Number, Recipient_Number, Recipient_Name) {
  try {
    console.log('The C.L.B. Hotline is currently sending a text message')

    let response = await TwilioApi.messages.create({
      body: `Hey Nishoake, ${Recipient_Name} (${Recipient_Number}) has subscribed to the C.L.B. Hotline🔥`,
      from: Twilio_Number,
      to: '+16477874515'
    })

    console.log(response.sid)

  } catch (error) {
      console.error(error)
  }
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
app.get('/', async (request, response) => {
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

  // Send confirmation text
  sendConfirmation(Twilio_Number, number, body.name)
  console.log('Text has been sent')


  response.send(newUser)
})
const SpotifyWebApi = require('spotify-web-api-node')
const Twilio = require('twilio')
const Subscriber = require('../models/subscriber')
require('dotenv').config()

// Initialize Twilio API Object and constant
const Twilio_Number = process.env.TWILIO_NUMBER
const TwilioApi = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

// Initialize Spotify API Object
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
})

// Authenticating with the Spotify API
async function authenticate() {
  try {
    const response = await spotifyApi.clientCredentialsGrant()
    const token = response.body.access_token

    return spotifyApi.setAccessToken(token)
  }
  catch (err) {
    console.log("Something went wrong when retrieving the access token", err)
  }
}

// Retrieving the latest Album from the Spotify API
async function getAlbum(artistID) {
  try {
    // setAccessToken before making GET request to the Spotify API
    await authenticate()

    // Ternary operator to toggle between detecting for artist's album or single
    const options = process.env.DETECT_ALBUM === 'true'
      ? {
          id: artistID,
          setting: {
            limit: 1,
            include_groups: 'album'
          },
          available_markets: 'CA',
        }
      : {
          id: artistID,
          setting: {
            limit: 1,
            include_groups: 'single'
          },
          available_markets: 'CA',
        }

    const data = await spotifyApi.getArtistAlbums(options.id, options.setting)

    const carePackage = {
      artistName: data.body.items[0].artists[0].name,
      albumName: data.body.items[0].name,
      image: data.body.items[0].images[0].url,
      link: data.body.items[0].external_urls.spotify
    }

    return carePackage
  }
  catch (err) {
    console.error(`Something went wrong requesting the ${artistID} album => ${err}`)
  }
}


// Create and send a single text message with Twilio SMS API
async function sendText(Twilio_Number, Twilio_Recipient, Recipient_Name, artistName, albumName, albumLink) {
  try{
    // Ternary operator to toggle between detecting for artist's album or single
    const response = process.env.DETECT_ALBUM === 'true'
      ? `Hey ${Recipient_Name}! ${artistName}'s new project, ${albumName} is now streaming live at: ${albumLink}`
      : `Hey ${Recipient_Name}! ${artistName}'s new single/EP, ${albumName} is now streaming live at: ${albumLink}`

    // Send Message
    await TwilioApi.messages.create({
      body: response,
      from: Twilio_Number,
      to: Twilio_Recipient
    })

  } catch (error) {
      console.error(`Not a valid North American number => ${error}`)
  }
}

// Sending text messages to all subscribers
async function sendToAll(albumInfo) {
  try{
    // Destructuring Album object
    const artistName = albumInfo.artistName
    const albumName = albumInfo.albumName
    const albumLink = albumInfo.link

    // Query Database to get an Array of all the subscribers
    const subscribers = await Subscriber.find()

    // Running a for loop on the subscribers array to send text message to each subscriber
    for (let i = 0; i < subscribers.length; i++) {
      const name = subscribers[i].name
      const number = subscribers[i].number

      await sendText(Twilio_Number, number, name, artistName, albumName, albumLink)
    }
  } catch{
      console.error(`Error sending texts => ${error}`)
  }
}

// Recursive Function comparing the last released album to the result from the getAlbum function
async function compareAlbum(refAlbum, artistID) {
  console.log('the detect function is being run right now')

  // Retrieving the latest Album from the Spotify API
  const latestAlbum = await getAlbum(artistID)
  console.log(`latestAlbum: ${latestAlbum.albumName}`)

  // Comparing the lastest album to the ref album (last released album)
  if (latestAlbum.albumName === refAlbum.albumName) {
    // Ping API every 30 seconds
    setTimeout(compareAlbum, 30000, refAlbum, artistID)
  }
  else {
    // Send Texts that new album has dropped
    sendToAll(latestAlbum)
  }
}


// Function Implementing the compareAlbum function and the associated overhead
async function detectAlbum(artistID) {
  // Initializing the last released album
  const refAlbum = await getAlbum(artistID)

  compareAlbum(refAlbum, artistID)
}


module.exports = {
  detect: detectAlbum,
}
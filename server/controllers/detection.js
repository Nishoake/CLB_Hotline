const SpotifyWebApi = require('spotify-web-api-node')
const Twilio = require('twilio')
const Subscriber = require('../models/subscriber')
require('dotenv').config()

// Create an instance of the Spotify API Object
const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET

const spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret
})


// Authenticating with the Spotify API
async function authenticate() {
  try {
    let response = await spotifyApi.clientCredentialsGrant()
    let token = response.body.access_token

    return spotifyApi.setAccessToken(token)
  }
  catch (err) {
    console.log("Something went wrong when retrieving the access token", err)
  }
}

// Retrieving the latest Album from the Spotify API
async function getAlbum(artistID) {
  try {
    await authenticate()

    const options = {
      id: artistID,
      setting: {
        limit: 1,
        include_groups: 'album'
      },
      available_markets: 'CA',
    }

    let data = await spotifyApi.getArtistAlbums(options.id, options.setting)

    const artistName = data.body.items[0].artists[0].name
    const albumName = data.body.items[0].name
    const image = data.body.items[0].images[0].url
    const link = data.body.items[0].external_urls.spotify

    const package = {
      artistName: artistName,
      albumName: albumName,
      image: image,
      link: link
    }

    return package
  }
  catch (err) {
    console.log("Something went wrong requesting the artist album", err)
  }
}

// Twilio Constants
const Twilio_SID = process.env.TWILIO_ACCOUNT_SID
const Twilio_Token = process.env.TWILIO_AUTH_TOKEN
const Twilio_Number = process.env.TWILIO_NUMBER

const TwilioApi = Twilio(Twilio_SID, Twilio_Token)

// Updating the clientResponse with the newly droped album details
function updateClientRespone(clientResponse, newName, newImage, newLink) {
  clientResponse.name = newName
  clientResponse.image = newImage
  clientResponse.link = newLink
  clientResponse.boolean = true
}

// Send text message with Twilio SMS API
async function sendText(Twilio_Number, Twilio_Recipient, Recipient_Name, artistName, albumName, albumLink) {
  console.log('The CLB Hotline is currently in production mode')
  // uncomment for the default drop message
  // `THIS IS NOT A DRILL ${Recipient_Name}! ${albumName} is streaming live at: ${albumLink}`

  try{
    let response = await TwilioApi.messages.create({
      body: `Wagawn ${Recipient_Name}! It's finally here 🏹💘🦉 ${albumName} is now streaming live at: ${albumLink}`,
      from: Twilio_Number,
      to: Twilio_Recipient
    })

    console.log(response.sid)
  } catch (error) {
      console.error(`Not a valid North American number => ${error}`)
  }
}

// Sending text messages to all subscribers
async function hotlineBling(albumInfo) {
  try{
    // Destructuring Album object
    const artistName = albumInfo.artistName
    const albumName = albumInfo.albumName
    const albumLink = albumInfo.link

    // Array of subscribers
    const subscribers = await Subscriber.find()
    console.log('Start!')

    for (let i = 0; i < subscribers.length; i++) {
      const name = subscribers[i].name
      const number = subscribers[i].number

      await sendText(Twilio_Number, number, name, artistName, albumName, albumLink)
    }

    console.log('Done!')
  } catch{
      console.error(`Something went wrong sending texts => ${error}`)
  }
}

// Detection Algorithm
async function detect(refAlbum, artistID, clientResponse) {
  console.log('the detect function is being run right now')

  // Retrieving the latest Album from the Spotify API
  let latestAlbum = await getAlbum(artistID)
  console.log(`latestAlbum: ${latestAlbum.albumName}`)

  // Comparing the lastest album to the ref album
  if (latestAlbum.albumName === refAlbum.albumName) {
    setTimeout(detect, 30000, refAlbum, artistID, clientResponse)
  }
  else {
    // Sending Texts
    console.log(`${latestAlbum.albumName} has dropped!`)
    // COMMENT FOR TESTING
    hotlineBling(latestAlbum)
    console.log('Texts messages have been sent!')

    // Updating the Client's NewAlbum component
    updateClientRespone(clientResponse, latestAlbum.albumName, latestAlbum.image, latestAlbum.link)
  }
}


// Function Implementing the Detection Algorithm and the associated overhead
async function detectAlbum(artistID, clientResponse) {
  // Initializing the reference album to compare against
  const refAlbum = await getAlbum(artistID)
  console.log(`refAlbum: ${refAlbum.albumName}`)

  // Calling the Detection Algorithm
  detect(refAlbum, artistID, clientResponse)
}


module.exports = {
  detect: detectAlbum,
}
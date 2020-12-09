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
        limit: 1
      },
      available_markets: 'CA'
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

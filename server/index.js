const app = require('./app')

const http = require('http')

require('dotenv').config()

const server = http.createServer(app)
const port = process.env.PORT || 3005

server.listen(port, () => {
  console.log(`Certified Lover Boy Hotline app is currently listening at ${port}`)
})
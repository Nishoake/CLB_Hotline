const mongoose = require('mongoose')

const subscriberSchema = mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true, unique: true },
})

module.exports = mongoose.model('Subscriber', subscriberSchema)
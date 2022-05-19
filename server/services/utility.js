// Defining Utility Functions
// Twilio Lookup
async function lookup(TwilioApi, number) {
  try {
    // Validate number using Twilio Lookup
    let result = await TwilioApi.lookups.phoneNumbers(number).fetch()

    // Returning the number in format expected by database
    return result.phoneNumber
  } catch (error) {
    console.error(`Not a valid North American number => ${error}`)
    return null
  }
}

// Twilio Confirmation Text
async function sendConfirmation(TwilioApi, Twilio_Number, Recipient_Number, Recipient_Name) {
  try {

    await TwilioApi.messages.create({
      body: `Hey ${Recipient_Name}! You are now subscribed to the C.L.B. Hotline! If this is a mistake, or you change your mind just text 'TAKECARE' to unsubscribe`,
      from: Twilio_Number,
      to: Recipient_Number
    })

  } catch (error) {
    console.error(`Not a valid mobile number => ${error}`)
  }
}

// Randomize Function
function randomize(arrayLength) {
  const max = Math.floor(arrayLength)
  return Math.floor(Math.random() * max)
}

module.exports = {
  lookup,
  sendConfirmation,
  randomize,
}
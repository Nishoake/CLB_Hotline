import axios from 'axios'
const baseUrl = '/api'

// Send POST Request with new user information
const addUser = async info => {
  // Format phone number with North American Country Code ('+1')
  const prefix = '+1'
  let mainNumber = info.phoneNumber
  let number = prefix.concat(mainNumber)

  let user = {
    name: info.firstname,
    number: number
  }

  // Send POST request
  const response = await axios.post(baseUrl, user)
  return response.data
}

export default { addUser }
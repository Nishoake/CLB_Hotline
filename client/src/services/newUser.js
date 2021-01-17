import axios from 'axios'
const baseUrl = '/api'


const addUser = async info => {
  const prefix = '+1'
  let mainNumber = info.phoneNumber
  let number = prefix.concat(mainNumber)

  let user = {
    name: info.firstname,
    number: number
  }
  
  // console.log(`user: ${JSON.stringify(user)}`)
  const response = await axios.post(baseUrl, user)
  return response.data
}



export default { addUser }
import axios from 'axios'
const baseUrl = '/api'


const addUser = async info => {
  let user = {
    name: info.firstname,
    number: info.phoneNumber
  }
  
  const response = await axios.post(baseUrl, user)
  return response.data
}



export default { addUser }
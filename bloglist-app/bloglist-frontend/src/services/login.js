import axios from 'axios'
import { baseUrl } from '../config'
const url = baseUrl + '/api/login'

const login = async (credentials) => {
  const response = await axios.post(url, credentials)
  console.log(response.data)
  return response.data
}
const loginService = { login }
export default loginService
